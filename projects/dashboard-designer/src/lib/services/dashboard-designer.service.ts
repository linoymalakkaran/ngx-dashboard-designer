import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  GridLayOutInstance,
  IGridLayOutInstance
} from '../models/dashboard.models';
import { ObservableEventsModel } from '../models/observable-events.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardDesignerService {
  selectedLayoutEvent$: BehaviorSubject<IGridLayOutInstance> =
    new BehaviorSubject<IGridLayOutInstance>(null);
  //this will be updated with latest dashboard config
  dashboardData: IGridLayOutInstance = null;
  //this is for custom dashboard layout option('+' button)
  dynamicDashboardData: IGridLayOutInstance = null;
  isNewLayoutSelected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isWidgetDragModeEnabled$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  dynamicWidgetLoadEvent$: BehaviorSubject<ObservableEventsModel> =
    new BehaviorSubject<ObservableEventsModel>(null);

  constructor() {}

  emitSelectedLayoutEvent(data: IGridLayOutInstance) {
    this.dashboardData = data;
    this.selectedLayoutEvent$.next(this.dashboardData);
  }

  getNewDashboardId(): number {
    let id = -1;
    this.dynamicDashboardData?.dashboardItems?.forEach(item => {
      if (id < item.id) {
        id = item.id;
      }
    });
    return ++id;
  }

  removeDashboardItem(item) {
    this.dynamicDashboardData.dashboardItems.splice(
      this.dynamicDashboardData.dashboardItems.indexOf(item),
      1
    );
  }
}
