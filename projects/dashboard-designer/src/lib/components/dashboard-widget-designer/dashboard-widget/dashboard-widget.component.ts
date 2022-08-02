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
  @Input() isViewMode?: boolean = false;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.isViewMode) {
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
    this.selectedWidgetOption = null;
    this.viewContainer.remove();
    this.isWidgetDropped = false;
    this.singleGridBoxItem.widgetOption = null;
  }
}
