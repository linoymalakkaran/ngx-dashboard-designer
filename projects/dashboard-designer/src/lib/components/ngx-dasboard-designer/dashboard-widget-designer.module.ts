import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardWidgetDesignerComponent } from './components/dashboard-widget-designer/dashboard-widget-designer.component';
import { DashboardWidgetComponent } from './components/dashboard-widget/dashboard-widget.component';
import { DashboardDesignerSharedModule } from '../../@shared/dashboard-designer-shared.module';
import { NgxDashboardDesignerComponent } from './components/ngx-dasboard-designer/ngx-dasboard-designer.component';
import {
  CenterBlockComponent,
  LeftBlockComponent,
  RightBlockComponent,
  TopBlockComponent
} from '../../layout';
import { DashboardWidgetErrorViewComponent } from './components/dashboard-widget-error-view/dashboard-widget-error-view.component';
import { NgxDashboardWidgetWrapperModule } from '../../@shared';

@NgModule({
  declarations: [
    DashboardWidgetDesignerComponent,
    NgxDashboardDesignerComponent,
    DashboardWidgetComponent,
    LeftBlockComponent,
    RightBlockComponent,
    CenterBlockComponent,
    TopBlockComponent,
    DashboardWidgetErrorViewComponent
  ],
  imports: [
    CommonModule,
    DashboardDesignerSharedModule,
    NgxDashboardWidgetWrapperModule
  ],
  exports: [NgxDashboardDesignerComponent],
  providers: []
})
export class DashboardWidgetDesignerModule {}
