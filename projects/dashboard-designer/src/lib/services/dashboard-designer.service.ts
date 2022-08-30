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
  dashboardData: IGridLayOutInstance = null;
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
    this.selectedLayoutEvent$.next(data);
  }

  removeDashboardItem(item) {
    this.dynamicDashboardData.dashboardItems.splice(
      this.dynamicDashboardData.dashboardItems.indexOf(item),
      1
    );
  }
}
