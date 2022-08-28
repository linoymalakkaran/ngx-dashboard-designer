import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';
import { NgxDashboardViewerComponent } from './components/ngx-dashboard-viewer/ngx-dashboard-viewer.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormsModule } from '@angular/forms';
import { DashResizeElementModule } from '../dashboard-resizer/resize-element.module';
import { DashIconModule } from '../icons-loader/dash-icon-module';
import { DashboardWidgetViewComponent } from './components/dashboard-widget-view/dashboard-widget-view.component';

@NgModule({
  declarations: [NgxDashboardViewerComponent, DashboardWidgetViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    GridsterModule,
    DashResizeElementModule,
    TabsModule.forRoot(),
    AccordionModule,
    DashIconModule
  ],
  exports: [NgxDashboardViewerComponent, DashboardWidgetViewComponent],
  providers: []
})
export class NgxDashboardViewerModule {}
