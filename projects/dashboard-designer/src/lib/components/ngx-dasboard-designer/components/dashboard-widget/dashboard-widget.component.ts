import {
  Component,
  ViewChild,
  ViewContainerRef,
  Input,
  ChangeDetectorRef,
  OnInit
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

@Component({
  selector: 'dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss']
})
export class DashboardWidgetComponent implements OnInit {
  @Input() widgetOptions: IDashboardWidgetOption;
  @ViewChild('vc', { read: ViewContainerRef, static: false })
  viewContainer: ViewContainerRef | undefined;
  widgetOptionDragged: MfeWidgetType[];
  isWidgetDropped: boolean = false;
  selectedWidgetOption: MfeWidgetType = null;
  @Input() singleGridBoxItem: SingleGridBoxItem;
  isNewLayoutSelected: boolean;
  isWidgetDragModeDisabled: boolean;

  constructor(
    private ref: ChangeDetectorRef,
    private dashboardDesignerService: DashboardDesignerService,
    private _iconsService: DashboardIconService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.dashboardDesignerService.isNewLayoutSelected$.subscribe(
      (isNewLayoutSelected: boolean) => {
        this.isNewLayoutSelected = isNewLayoutSelected;
      }
    );
    this.dashboardDesignerService.isWidgetDragModeEnabled$.subscribe(
      (isWidgetDragModeEnabled: boolean) => {
        this.isWidgetDragModeDisabled = isWidgetDragModeEnabled;
        if (!this.isWidgetDragModeDisabled) {
          this.deleteWidget();
        }
      }
    );
    this.applyWideget();
  }

  applyWideget() {
    if (this.singleGridBoxItem.widgetOption) {
      this.isWidgetDragModeDisabled = true;
      this.loadMfeWidget(this.singleGridBoxItem.widgetOption);
    }
  }

  async loadMfeWidget(widgetOption: MfeWidgetType): Promise<void> {
    this.isWidgetDropped = true;
    const m = await loadRemoteModule({
      type: widgetOption.type as any,
      remoteEntry: widgetOption.hostUrl,
      exposedModule: widgetOption.exposedModule
    });
    const ref = this.viewContainer.createComponent(
      m[widgetOption.componentName]
    );
    const compInstance: any = ref.instance;
    this.singleGridBoxItem['compInstance'] = compInstance;
    setInterval(() => {
      this.singleGridBoxItem.widgetOption = widgetOption;
      this.ref.markForCheck();
    }, 1000);
  }

  drop(event: CdkDragDrop<MfeWidgetType[]>) {
    if (this.selectedWidgetOption) {
      alert('Please remove widget, before adding new...!');
      return;
    }
    this.selectedWidgetOption =
      this.widgetOptions.mfeWidgetTypes[event.previousIndex];
    this.loadMfeWidget(this.selectedWidgetOption);
  }

  deleteWidget() {
    if (this.singleGridBoxItem.widgetOption != null && this.viewContainer) {
      this.selectedWidgetOption = null;
      this.singleGridBoxItem['compInstance'] = null;
      this.viewContainer.remove();
      this.isWidgetDropped = false;
      setInterval(() => {
        this.singleGridBoxItem.widgetOption = null;
        this.ref.markForCheck();
      }, 1000);
    }
  }

  removeItem($event: MouseEvent | TouchEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboardDesignerService.removeDashboardItem(this.singleGridBoxItem);
  }

  private get icons(): Array<string> {
    return ['delete-icon', 'drag-icon'];
  }
}
