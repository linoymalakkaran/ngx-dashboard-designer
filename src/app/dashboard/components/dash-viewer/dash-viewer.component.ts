import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGridLayOutInstance } from 'projects/dashboard-designer/src/lib/models/dashboard.models';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dash-viewer',
  templateUrl: './dash-viewer.component.html',
  styleUrls: ['./dash-viewer.component.scss']
})
export class DashViewerComponent implements OnInit, OnDestroy {
  dashboardLayout: IGridLayOutInstance;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardLayout = this.dashboardService.layoutInfo;
    console.log('view loader => ', this.dashboardLayout);
  }

  changedOptions(): void {
    if (
      this.dashboardLayout.options.api &&
      this.dashboardLayout.options.api.optionsChanged
    ) {
      this.dashboardLayout.options.api.optionsChanged();
    }
  }

  ngOnDestroy(): void {
    this.dashboardLayout = null;
    this.dashboardService.layoutInfo = null;
  }
}
