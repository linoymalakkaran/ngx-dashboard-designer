import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormsModule } from '@angular/forms';
import { DashResizeElementModule } from '../dashboard-resizer/resize-element.module';
import { DashIconModule } from '../icons-loader/dash-icon-module';
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

@NgModule({
  declarations: [
    DashboardWidgetDesignerComponent,
    NgxDashboardDesignerComponent,
    DashboardWidgetComponent,
    LeftBlockComponent,
    RightBlockComponent,
    CenterBlockComponent,
    TopBlockComponent
  ],
  imports: [CommonModule, DashboardDesignerSharedModule],
  exports: [
    DashboardDesignerSharedModule,
    DashboardWidgetDesignerComponent,
    NgxDashboardDesignerComponent,
    DashboardWidgetComponent,
    LeftBlockComponent,
    RightBlockComponent,
    CenterBlockComponent,
    TopBlockComponent
  ],
  providers: []
})
export class DashboardWidgetDesignerModule {}
