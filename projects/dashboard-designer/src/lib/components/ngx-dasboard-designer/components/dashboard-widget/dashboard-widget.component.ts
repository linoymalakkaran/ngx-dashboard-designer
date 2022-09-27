import {
  Component,
  ViewChild,
  ViewContainerRef,
  Input,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  QueryList,
  ViewChildren,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  IDashboardWidgetOption,
  MfeWidgetType
} from '../../../../models/dashboard-widget-options.model';
import { SingleGridBoxItem } from '../../../../models/dashboard.models';
import { DashboardDesignerService } from '../../../../services/dashboard-designer.service';
import { DashboardIconService } from '../../../../services/dashboard-icon.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss']
})
export class DashboardWidgetComponent implements OnInit, OnDestroy {
  private _unsubscribeAll$ = new Subject<any>();
  @Input() widgetOptions: IDashboardWidgetOption;
  @ViewChild('vc', { read: ViewContainerRef, static: false })
  viewContainer: ViewContainerRef | undefined;
  widgetOptionDragged: MfeWidgetType[];
  isWidgetDropped: boolean = false;
  selectedWidgetOptions: MfeWidgetType[] = [];
  @Input() singleGridBoxItem: SingleGridBoxItem;
  isNewLayoutSelected: boolean;
  isWidgetDragModeDisabled: boolean = false;
  showMenu = false;
  @Input() numberOfDragableItems: number = 5;
  isMultipleWidgetDragEnabled: boolean = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _dashboardDesignerService: DashboardDesignerService,
    private _dashboardIconService: DashboardIconService
  ) {
    this._dashboardIconService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    if (
      this.singleGridBoxItem.widgetOptions == null ||
      this.singleGridBoxItem.widgetOptions == undefined
    ) {
      this.singleGridBoxItem.widgetOptions = [];
    }
    this._dashboardDesignerService.isNewLayoutSelected$
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((isNewLayoutSelected: boolean) => {
        this.isNewLayoutSelected = isNewLayoutSelected;
      });
    this._dashboardDesignerService.isWidgetDragModeEnabled$
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((isWidgetDragModeEnabled: boolean) => {
        this.isWidgetDragModeDisabled = isWidgetDragModeEnabled;
        if (!this.isWidgetDragModeDisabled) {
          this.deleteWidget();
        }
      });
    this.applyWideget();
  }

  applyWideget() {
    if (this.singleGridBoxItem.widgetOptions?.length > 0) {
      this.selectedWidgetOptions = JSON.parse(
        JSON.stringify(this.singleGridBoxItem.widgetOptions)
      );
      this.isWidgetDragModeDisabled = true;
      this.selectedWidgetOptions.forEach(widgetOption => {
        this.loadMfeWidget(widgetOption, false);
      });
    }
  }

  async loadMfeWidget(
    widgetOption: MfeWidgetType,
    isWidgetOptionNeedsToPush = true
  ): Promise<void> {
    const m = await loadRemoteModule({
      type: widgetOption.type as any,
      remoteEntry: widgetOption.hostUrl,
      exposedModule: widgetOption.exposedModule
    });
    this.viewContainer.createComponent(m[widgetOption.componentName]);
    setTimeout(() => {
      this.isWidgetDropped = true;
      if (isWidgetOptionNeedsToPush) {
        if (
          this.singleGridBoxItem.widgetOptions == null ||
          this.singleGridBoxItem.widgetOptions == undefined
        ) {
          this.singleGridBoxItem.widgetOptions = [];
        }
        this.singleGridBoxItem.widgetOptions.push(widgetOption);
      }
      this._changeDetectorRef.markForCheck();
    }, 1000);
  }

  drop(event: CdkDragDrop<MfeWidgetType[]>) {
    if (!this.isMultipleWidgetDragEnabled) {
      if (this.selectedWidgetOptions.length > 0) {
        alert('Please remove widget, before adding new...!');
        return;
      }
    }

    if (this.widgetOptions.mfeWidgetTypes[event.previousIndex]) {
      this.selectedWidgetOptions.push(
        this.widgetOptions.mfeWidgetTypes[event.previousIndex]
      );
      this.loadMfeWidget(
        this.widgetOptions.mfeWidgetTypes[event.previousIndex],
        true
      );
    }
  }

  deleteWidget() {
    if (this.singleGridBoxItem.widgetOptions != null && this.viewContainer) {
      this.selectedWidgetOptions = [];
      this.singleGridBoxItem.widgetOptions = [];
      this.viewContainer.clear();
      this.isWidgetDropped = false;
      setInterval(() => {
        this.singleGridBoxItem.widgetOptions = [];
        this._changeDetectorRef.markForCheck();
      }, 1000);
    }
  }

  removeItem($event: MouseEvent | TouchEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this._dashboardDesignerService.removeDashboardItem(this.singleGridBoxItem);
  }

  private get icons(): Array<string> {
    return ['delete-icon', 'drag-icon', 'settings-icon'];
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next(null);
    this._unsubscribeAll$.complete();
  }

  enableMultiwidgtDrop(e): void {
    this.singleGridBoxItem['isMultipleWidgetDragEnabled'] =
      this.isMultipleWidgetDragEnabled;
  }
}
