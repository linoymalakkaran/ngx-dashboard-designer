import { Component, OnInit } from '@angular/core';
import { GridLayOutInstance } from '../../models';
import { DashboardDesignerService } from '../../services/dashboard-designer.service';
import { DashboardIconService } from '../../services/dashboard-icon.service';

@Component({
  selector: 'app-right-block',
  templateUrl: './right-block.component.html',
  styleUrls: ['./right-block.component.scss']
})
export class RightBlockComponent implements OnInit {
  dashboardLayout: GridLayOutInstance;

  constructor(
    private dashboardDesignerService: DashboardDesignerService,
    private _iconsService: DashboardIconService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.dashboardDesignerService.selectedLayoutEvent$.subscribe(
      (griditem: GridLayOutInstance) => {
        if (griditem) {
          this.dashboardLayout = griditem;
        }
      }
    );
  }

  changedOptions(): void {
    if (
      this.dashboardLayout.options.api &&
      this.dashboardLayout.options.api.optionsChanged
    ) {
      this.dashboardLayout.options.api.optionsChanged();
    }
  }

  private get icons(): Array<string> {
    return ['down-chevron'];
  }
}
