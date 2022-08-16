import {
  Component,
  ViewChild,
  ViewContainerRef,
  Input,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import {
  IDashboardWidgetOption,
  MfeWidgetType
} from '../../../models/dashboard-widget-options.model';
import { SingleGridBoxItem } from '../../../models/dashboard.models';
import { DashboardDesignerService } from '../../../services/dashboard-designer.service';
import { DashboardIconService } from '../../../services/dashboard-icon.service';

@Component({
  selector: 'dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss']
})
export class DashboardWidgetComponent implements OnInit {
  @Input() widgetOptions: IDashboardWidgetOption;
  @Input() editLayoutJSON: any;
  @ViewChild('vc', { read: ViewContainerRef, static: false })
  viewContainer: ViewContainerRef | undefined;
  widgetOptionDragged: MfeWidgetType[];
  isWidgetDropped: boolean = false;
  selectedWidgetOption: MfeWidgetType = null;
  @Input() singleGridBoxItem: SingleGridBoxItem;
  @Input() isViewMode?: boolean = false;
  isNewLayoutSelected: boolean;
  isWidgetDragModeEnabled: boolean;

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
        this.isWidgetDragModeEnabled = isWidgetDragModeEnabled;
        if (!this.isWidgetDragModeEnabled && !this.editLayoutJSON) {
          this.deleteWidget();
        }
      }
    );
    if (this.isViewMode || this.editLayoutJSON) {
      this.applyWideget();
    }
  }

  applyWideget() {
    if (this.singleGridBoxItem.widgetOption) {
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
    // const compInstance = ref.instance;
    setInterval(() => {
      this.singleGridBoxItem.widgetOption = widgetOption;
      this.ref.markForCheck();
    }, 1000);
  }

  drop(event: CdkDragDrop<MfeWidgetType[]>) {
    if (this.isViewMode) return;
    // transferArrayItem(
    //   event.previousContainer.data,
    //   event.container.data,
    //   event.previousIndex,
    //   event.currentIndex
    // );
    if (this.selectedWidgetOption) {
      alert('Please remove widget before add new.');
      return;
    }
    this.selectedWidgetOption =
      this.widgetOptions.mfeWidgetTypes[event.previousIndex];
    this.loadMfeWidget(this.selectedWidgetOption);
  }

  deleteWidget() {
    if (this.singleGridBoxItem.widgetOption != null) {
      this.selectedWidgetOption = null;
      this.viewContainer.remove();
      this.isWidgetDropped = false;
      // this.singleGridBoxItem.widgetOption = null;
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
