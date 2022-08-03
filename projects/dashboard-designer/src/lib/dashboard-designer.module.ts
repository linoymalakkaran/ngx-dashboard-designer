import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';
import { DashboardViewerComponent } from './components/ngx-dashboard-viewer/ngx-dashboard-viewer.component';
import { DashboardWidgetDesignerComponent } from './components/dashboard-widget-designer/dashboard-widget-designer.component';
import { DashboardWidgetComponent } from './components/dashboard-widget-designer/dashboard-widget/dashboard-widget.component';
import {
  CenterBlockComponent,
  LeftBlockComponent,
  RightBlockComponent,
  TopBlockComponent
} from './layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDashboardDesigner } from './components/ngx-dasboard-designer/ngx-dasboard-designer.component';
import { AngularResizeElementModule } from './components/dashboard-resizer/angular-resize-element.module';
import { TranslationService } from './services/translation.service';
import { TranslatePipe } from './pipes/translate.pipe';

@NgModule({
  declarations: [
    DashboardWidgetDesignerComponent,
    DashboardWidgetComponent,
    DashboardViewerComponent,
    NgxDashboardDesigner,
    LeftBlockComponent,
    RightBlockComponent,
    CenterBlockComponent,
    TopBlockComponent,
    TranslatePipe
  ],
  imports: [
    CommonModule,
    GridsterModule,
    AngularResizeElementModule,
    DragDropModule,
    TabsModule.forRoot(),
    AccordionModule,
    ModalModule.forRoot()
  ],
  exports: [
    DashboardWidgetDesignerComponent,
    DashboardWidgetComponent,
    DashboardViewerComponent,
    NgxDashboardDesigner,
    LeftBlockComponent,
    RightBlockComponent,
    CenterBlockComponent,
    TopBlockComponent,
    AngularResizeElementModule,
    DragDropModule
  ],
  providers: [TranslationService]
})
export class NgxDashboardDesignerModule {}
