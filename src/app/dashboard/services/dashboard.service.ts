import { Injectable } from '@angular/core';
import { layoutDefaultData } from '../data-provider/dashboard-layout-data';
import { GridLayOutInstance } from 'projects/dashboard-designer/src/lib/models/dashboard.models';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  public layoutData: GridLayOutInstance = layoutDefaultData;

  constructor() {}

  getLayoutData(): GridLayOutInstance {
    return this.layoutData;
  }
}
