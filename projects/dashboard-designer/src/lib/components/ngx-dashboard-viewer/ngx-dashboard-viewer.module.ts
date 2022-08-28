import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxDashboardViewerComponent } from './components/ngx-dashboard-viewer/ngx-dashboard-viewer.component';
import { DashboardWidgetViewComponent } from './components/dashboard-widget-view/dashboard-widget-view.component';
import { DashboardDesignerSharedModule } from '../../@shared/dashboard-designer-shared.module';

@NgModule({
  declarations: [NgxDashboardViewerComponent, DashboardWidgetViewComponent],
  imports: [CommonModule, DashboardDesignerSharedModule],
  exports: [NgxDashboardViewerComponent, DashboardWidgetViewComponent],
  providers: []
})
export class NgxDashboardViewerModule {}
