import { Injectable } from '@angular/core';
import { layoutDefaultData } from '../data-provider/dashboard-layout-data';
import { IGridLayOutInstance } from 'projects/dashboard-designer/src/lib/models/dashboard.models';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private layoutData: IGridLayOutInstance = null;

  constructor() {}

  get layoutInfo(): IGridLayOutInstance {
    return this.layoutData || layoutDefaultData;
  }

  set layoutInfo(layoutData: IGridLayOutInstance) {
    this.layoutData = JSON.parse(JSON.stringify(layoutData));
  }
}
