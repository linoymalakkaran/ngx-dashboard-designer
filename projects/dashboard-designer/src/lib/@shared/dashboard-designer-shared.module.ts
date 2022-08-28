import { NgModule } from '@angular/core';
import { TranslatePipe } from '../pipes/translate.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GridsterModule } from 'angular-gridster2';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DashResizeElementModule } from '../components';
import { FormsModule } from '@angular/forms';
import { DashIconModule } from './icons-loader/dash-icon-module';
import { DashboardIconService } from '../services/dashboard-icon.service';
import { TranslationService } from '../services/translation.service';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [TranslatePipe],
  imports: [
    GridsterModule,
    TabsModule.forRoot(),
    AccordionModule,
    DashIconModule,
    DashResizeElementModule,
    DragDropModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  exports: [
    GridsterModule,
    TabsModule,
    AccordionModule,
    DashIconModule,
    DashResizeElementModule,
    DragDropModule,
    FormsModule,
    TranslatePipe,
    ModalModule
  ],
  providers: [TranslationService, DashboardIconService, BsModalService]
})
export class DashboardDesignerSharedModule {}
