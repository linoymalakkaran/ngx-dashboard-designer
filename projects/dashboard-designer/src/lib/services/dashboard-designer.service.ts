import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GridLayOutInstance } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardDesignerService {
  selectedLayoutEvent: BehaviorSubject<GridLayOutInstance> =
    new BehaviorSubject<GridLayOutInstance>(null);
  dashboardData: GridLayOutInstance = null;

  constructor() {}

  emitSelectedLayoutEvent(data: GridLayOutInstance) {
    this.dashboardData = data;
    this.selectedLayoutEvent.next(data);
  }
}
