import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashDesignerComponent } from './components/dash-designer/dash-designer.component';
import {
  DashboardModuleConfigModel,
  NgxDashboardDesignerModule
} from 'projects/dashboard-designer/src/public-api';
import { DashViewerComponent } from './components/dash-viewer/dash-viewer.component';

const dashboardConfig: DashboardModuleConfigModel = {
  baseAssetsPath: 'assets/dashboard-designer/',
  fontBaseUrl: 'assets/dashboard-designer/',
  isDynamicFontLoading: false,
  isRemoteUrlLangEnabled: false
};

@NgModule({
  declarations: [DashDesignerComponent, DashViewerComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxDashboardDesignerModule.forRoot(dashboardConfig)
  ]
})
export class DashboardModule {}
