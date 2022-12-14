import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslationService } from './services/translation.service';
import { DashboardModuleConfigModel } from './models/dashboard-module-config.model';
import { DASHBOARD_CONFIG } from './injectors/dashboard-injectors';
import { DashboardIconService } from './services/dashboard-icon.service';
import { NgxDashboardViewerModule } from './components/ngx-dashboard-viewer/ngx-dashboard-viewer.module';
import { DashboardWidgetDesignerModule } from './components/ngx-dasboard-designer/dashboard-widget-designer.module';
import { DashboardDesignerSharedModule } from './@shared/dashboard-designer-shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardDesignerTokenInterceptor } from './interceptor/token-interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxDashboardViewerModule,
    DashboardWidgetDesignerModule,
    DashboardDesignerSharedModule
  ],
  exports: [
    NgxDashboardViewerModule,
    DashboardWidgetDesignerModule,
    DashboardDesignerSharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DashboardDesignerTokenInterceptor,
      multi: true
    }
  ]
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
