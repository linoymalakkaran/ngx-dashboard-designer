import { InjectionToken } from '@angular/core';
import { DashboardModuleConfigModel } from '../models/dashboard-module-config.model';

export const DASHBOARD_CONFIG = new InjectionToken<DashboardModuleConfigModel>(
  'dashBoardConfig'
);
