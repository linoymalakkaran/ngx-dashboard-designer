import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashDesignerComponent } from './components/dash-designer/dash-designer.component';
import { DashViewerComponent } from './components/dash-viewer/dash-viewer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'designer',
    pathMatch: 'full'
  },
  {
    path: 'designer',
    component: DashDesignerComponent
  },
  {
    path: 'viewer',
    component: DashViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
