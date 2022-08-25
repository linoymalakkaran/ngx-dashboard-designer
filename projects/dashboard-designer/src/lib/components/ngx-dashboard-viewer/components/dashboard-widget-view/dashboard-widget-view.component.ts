import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { SingleGridBoxItem } from 'dist/dashboard-designer/lib/models/dashboard.models';
import { DASHBOARD_CONFIG } from 'projects/dashboard-designer/src/lib/injectors/dashboard-injectors';
import { DashboardModuleConfigModel } from 'projects/dashboard-designer/src/lib/models';
import { MfeWidgetType } from 'projects/dashboard-designer/src/lib/models/dashboard-widget-options.model';
import {
  MfeEventsTypes,
  ObservableEventsModel
} from 'projects/dashboard-designer/src/lib/models/observable-events.model';
import { DashboardDesignerService } from 'projects/dashboard-designer/src/lib/services/dashboard-designer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'dashboard-widget-view',
  templateUrl: './dashboard-widget-view.component.html',
  styleUrls: ['./dashboard-widget-view.component.scss']
})
export class DashboardWidgetViewComponent implements OnInit {
  @ViewChild('vc', { read: ViewContainerRef, static: false })
  viewContainer: ViewContainerRef | undefined;
  @Input() singleGridBoxItem: SingleGridBoxItem;
  @Input() lang: 'en' | 'ar' = 'en';

  constructor(
    private ref: ChangeDetectorRef,
    private dashboardDesignerService: DashboardDesignerService,
    @Inject(DASHBOARD_CONFIG)
    private config: DashboardModuleConfigModel
  ) {}

  ngOnInit(): void {
    this.dashboardDesignerService.dynamicWidgetLoadEvent$.subscribe(
      (mfeConfig: ObservableEventsModel) => {
        if (
          mfeConfig?.data &&
          mfeConfig?.eventsType == MfeEventsTypes.LOAD_WIDGET
        ) {
          if (mfeConfig.data?.location) {
            if (
              this.singleGridBoxItem.x == mfeConfig.data?.location.x &&
              this.singleGridBoxItem.y == mfeConfig.data?.location.y
            ) {
              this.loadMfeWidget(mfeConfig?.data);
            }
          }
        }
      }
    );
    this.applyWideget();
  }

  applyWideget() {
    if (this.singleGridBoxItem.widgetOption) {
      this.loadMfeWidget(this.singleGridBoxItem.widgetOption);
    }
  }

  async loadMfeWidget(widgetOption: MfeWidgetType): Promise<void> {
    let hostUrl = widgetOption.hostUrl;
    if (this.config.isRemoteUrlLangEnabled) {
      hostUrl = hostUrl.replace('__lang__', this.lang);
    }
    const m = await loadRemoteModule({
      type: widgetOption.type as any,
      remoteEntry: hostUrl,
      exposedModule: widgetOption.exposedModule
    });
    const ref = this.viewContainer.createComponent(
      m[widgetOption.componentName]
    );
    const compInstance: any = ref.instance;
    compInstance.events$?.forEach((event: Observable<any>) => {
      event.subscribe((eventData: ObservableEventsModel) => {
        this.eventsHandler(eventData);
      });
    });
    setInterval(() => {
      this.singleGridBoxItem.widgetOption = widgetOption;
      this.ref.markForCheck();
    }, 1000);
  }

  eventsHandler(eventData: ObservableEventsModel) {
    if (eventData.data) {
      switch (eventData.eventsType) {
        case MfeEventsTypes.LOAD_WIDGET: {
          this.dashboardDesignerService.dynamicWidgetLoadEvent$.next(eventData);
          break;
        }
        case MfeEventsTypes.INITIAL_LOAD_WIDGET: {
          this.dashboardDesignerService.dynamicWidgetLoadEvent$.next(eventData);
          break;
        }
        default:
          break;
      }
    }
    console.log(eventData);
  }

  deleteWidget() {
    if (this.singleGridBoxItem.widgetOption != null && this.viewContainer) {
      this.viewContainer.remove();
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
}
