import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';
// import {
//   CenterBlockComponent,
//   LeftBlockComponent,
//   RightBlockComponent,
//   TopBlockComponent
// } from './layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DashResizeElementModule } from './components/dashboard-resizer/resize-element.module';
import { TranslationService } from './services/translation.service';
import { TranslatePipe } from './pipes/translate.pipe';
import { DashIconModule } from './components/icons-loader/dash-icon-module';
import { DashboardModuleConfigModel } from './models/dashboard-module-config.model';
import { DASHBOARD_CONFIG } from './injectors/dashboard-injectors';
import { DashboardIconService } from './services/dashboard-icon.service';
import { FormsModule } from '@angular/forms';
import { NgxDashboardViewerModule } from './components/ngx-dashboard-viewer/ngx-dashboard-viewer.module';
import { DashboardWidgetDesignerModule } from './components/ngx-dasboard-designer/dashboard-widget-designer.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GridsterModule,
    DashResizeElementModule,
    DragDropModule,
    TabsModule.forRoot(),
    AccordionModule,
    ModalModule.forRoot(),
    DashIconModule,
    NgxDashboardViewerModule,
    DashboardWidgetDesignerModule
  ],
  exports: [
    DashResizeElementModule,
    DragDropModule,
    NgxDashboardViewerModule,
    DashboardWidgetDesignerModule
  ],
  providers: [TranslationService, DashboardIconService]
})
export class NgxDashboardDesignerModule {
  static forRoot(
    config?: DashboardModuleConfigModel
  ): ModuleWithProviders<NgxDashboardDesignerModule> {
    return {
      ngModule: NgxDashboardDesignerModule,
      providers: [{ provide: DASHBOARD_CONFIG, useValue: config }]
    };
  }
}
