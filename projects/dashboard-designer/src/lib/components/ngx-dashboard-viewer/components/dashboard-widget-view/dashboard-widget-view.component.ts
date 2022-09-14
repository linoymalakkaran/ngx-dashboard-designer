import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { SingleGridBoxItem } from '../../../../../lib/models/dashboard.models';
import { Observable, Subject } from 'rxjs';
import { DashboardDesignerService } from '../../../../../lib/services/dashboard-designer.service';
import { DASHBOARD_CONFIG } from '../../../../../lib/injectors/dashboard-injectors';
import {
  DashboardModuleConfigModel,
  IMfeInputModel,
  IMfeOutputModel,
  MfeEventsTypes,
  MfeWidgetType,
  ObservableEventsModel
} from '../../../../../lib/models';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dashboard-widget-view',
  templateUrl: './dashboard-widget-view.component.html',
  styleUrls: ['./dashboard-widget-view.component.scss']
})
export class DashboardWidgetViewComponent<C = any>
  implements OnInit, OnDestroy
{
  // @ViewChild('vc', { read: ViewContainerRef, static: false })
  // viewContainer: ViewContainerRef | undefined;
  private _unsubscribeAll$ = new Subject<any>();
  @Input() singleGridBoxItem: SingleGridBoxItem;
  @Input() lang: 'en' | 'ar' = 'en';
  componentInstances: Type<C>[] | null = [];
  inputs: IMfeInputModel = {
    gridData: {},
    getGridInstance: () => {}
  };
  // outputs: IMfeOutputModel = {
  //   loadWidget: (data: ObservableEventsModel) => this.eventsHandler(data)
  // };
  outputs = {
    loadWidget: (data: ObservableEventsModel) => this.eventsHandler(data)
  };

  constructor(
    private ref: ChangeDetectorRef,
    private dashboardDesignerService: DashboardDesignerService,
    @Inject(DASHBOARD_CONFIG)
    private config: DashboardModuleConfigModel
  ) {}

  ngOnInit(): void {
    this.dashboardDesignerService.dynamicWidgetLoadEvent$
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((mfeConfig: ObservableEventsModel) => {
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
            } else {
              console.info(
                'x,y location is not matching...! for loading widget.'
              );
              console.info('current x,y location is: , ', {
                x: mfeConfig.data?.location.x,
                y: mfeConfig.data?.location.y
              });
            }
          } else if (mfeConfig.data?.ID) {
            if (this.singleGridBoxItem.id == mfeConfig.data?.ID) {
              this.loadMfeWidget(mfeConfig?.data);
            } else {
              console.info('ID is not matching...! for loading widget.');
              console.info('current ID is: , ', {
                clickedId: mfeConfig.data?.ID,
                currentId: this.singleGridBoxItem.id
              });
            }
          } else {
            console.error('Location missing...! for loading widget.');
          }
        }
      });
    this.applyWideget();
    this.inputs.gridData = this;
  }

  applyWideget() {
    if (this.singleGridBoxItem.widgetOptions) {
      this.singleGridBoxItem.widgetOptions.forEach(widgetOption => {
        this.loadMfeWidget(widgetOption);
      });
    }
  }

  async loadMfeWidget(widgetOption: MfeWidgetType): Promise<void> {
    let hostUrl = widgetOption.hostUrl;
    if (this.config.isRemoteUrlLangEnabled) {
      hostUrl = hostUrl.replace('__lang__', this.lang);
    }
    const moduleRef = await loadRemoteModule({
      type: widgetOption.type as any,
      remoteEntry: hostUrl,
      exposedModule: widgetOption.exposedModule
    });

    this.componentInstances.push(moduleRef[widgetOption.componentName]);

    //don't remove'
    // @deprecated
    // const ref = this.viewContainer.createComponent(
    //   m[widgetOption.componentName]
    // );
    // const compInstance: any = ref.instance;
    // compInstance.events$?.forEach((event: Observable<any>) => {
    //   event.subscribe((eventData: ObservableEventsModel) => {
    //     this.eventsHandler(eventData);
    //   });
    // });
    setInterval(() => {
      // this.singleGridBoxItem.widgetOptions.push(widgetOption);
      this.ref.markForCheck();
    }, 1000);
  }

  onComponentLoaed(comInstance: any) {
    const compInstance: any = comInstance.instance;
    compInstance.events$?.forEach((event: Observable<any>) => {
      event
        .pipe(takeUntil(this._unsubscribeAll$))
        .subscribe((eventData: ObservableEventsModel) => {
          this.eventsHandler(eventData);
        });
    });
    this.inputs.getGridInstance = () => {
      return this;
    };
  }

  eventsHandler(eventData: ObservableEventsModel): void {
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

  ngOnDestroy() {
    this.dashboardDesignerService.dynamicWidgetLoadEvent$.next(null);
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }
}
