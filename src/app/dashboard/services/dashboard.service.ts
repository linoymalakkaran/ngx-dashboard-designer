import { Injectable } from '@angular/core';
import { layoutDefaultData } from '../data-provider/dashboard-layout-data';
import {
  GridLayOutInstance,
  IGridLayOutInstance
} from 'projects/dashboard-designer/src/lib/models/dashboard.models';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  public layoutData: IGridLayOutInstance = layoutDefaultData;

  constructor() {}

  getLayoutData(): IGridLayOutInstance {
    return this.layoutData;
  }
}
