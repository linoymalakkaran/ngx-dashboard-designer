import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashDesignerComponent } from './components/dash-designer/dash-designer.component';
import { NgxDashboardDesignerModule } from 'projects/dashboard-designer/src/public-api';
import { DashViewerComponent } from './components/dash-viewer/components/dash-viewer.component';

@NgModule({
  declarations: [DashDesignerComponent, DashViewerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    NgxDashboardDesignerModule
  ]
})
export class DashboardModule {}
