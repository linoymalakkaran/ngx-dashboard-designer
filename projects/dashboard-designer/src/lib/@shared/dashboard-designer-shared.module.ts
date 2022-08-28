import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../pipes/translate.pipe';
import {
  LeftBlockComponent,
  RightBlockComponent,
  CenterBlockComponent,
  TopBlockComponent
} from '../layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GridsterModule } from 'angular-gridster2';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {
  DashboardWidgetDesignerComponent,
  DashResizeElementModule,
  NgxDashboardDesignerComponent
} from '../components';
import { DashIconModule } from '../components/icons-loader/dash-icon-module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TranslatePipe],
  imports: [
    GridsterModule,
    TabsModule.forRoot(),
    AccordionModule,
    DashIconModule,
    DashResizeElementModule,
    DragDropModule,
    FormsModule
  ],
  exports: [
    GridsterModule,
    TabsModule,
    AccordionModule,
    DashIconModule,
    DashResizeElementModule,
    DragDropModule,
    FormsModule,
    TranslatePipe
  ]
})
export class DashboardDesignerSharedModule {}
