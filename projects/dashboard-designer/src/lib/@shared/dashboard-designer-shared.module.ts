import { NgModule } from '@angular/core';
import { DashboardTranslatePipe } from './pipes/translate.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashIconModule } from './icons-loader/dash-icon.module';
import { DashboardIconService } from '../services/dashboard-icon.service';
import { TranslationService } from '../services/translation.service';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { DashResizeElementModule } from './dashboard-resizer/resize-element.module';
import { DynamicModule } from './dash-dynamic-loader';
import { GridsterModule } from './angular-gridster-2';

@NgModule({
  declarations: [DashboardTranslatePipe],
  imports: [
    GridsterModule,
    TabsModule.forRoot(),
    AccordionModule,
    DashIconModule,
    DashResizeElementModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    DynamicModule
  ],
  exports: [
    GridsterModule,
    TabsModule,
    AccordionModule,
    DashIconModule,
    DashResizeElementModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardTranslatePipe,
    ModalModule,
    DynamicModule
  ],
  providers: [TranslationService, DashboardIconService, BsModalService]
})
export class DashboardDesignerSharedModule {}
