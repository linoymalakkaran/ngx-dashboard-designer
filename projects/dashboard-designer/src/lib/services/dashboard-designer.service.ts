import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GridLayOutInstance } from '../models/dashboard.models';
import { ObservableEventsModel } from '../models/observable-events.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardDesignerService {
  selectedLayoutEvent$: BehaviorSubject<GridLayOutInstance> =
    new BehaviorSubject<GridLayOutInstance>(null);
  dashboardData: GridLayOutInstance = null;
  dynamicDashboardData: GridLayOutInstance = null;
  isNewLayoutSelected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isWidgetDragModeEnabled$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  dynamicWidgetLoadEvent$: BehaviorSubject<ObservableEventsModel> =
    new BehaviorSubject<ObservableEventsModel>(null);

  constructor() {}

  emitSelectedLayoutEvent(data: GridLayOutInstance) {
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
