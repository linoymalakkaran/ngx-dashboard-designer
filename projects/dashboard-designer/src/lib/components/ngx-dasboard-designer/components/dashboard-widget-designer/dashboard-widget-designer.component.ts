import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IDashboardWidgetOption } from '../../../../models/dashboard-widget-options.model';
import { GridLayOutInstance } from '../../../../models/dashboard.models';
import { DashboardDesignerService } from '../../../../services/dashboard-designer.service';

@Component({
  selector: 'dashboard-widget-designer',
  templateUrl: './dashboard-widget-designer.component.html',
  styleUrls: ['./dashboard-widget-designer.component.scss']
})
export class DashboardWidgetDesignerComponent implements OnInit {
  @Input() widgetOptions?: IDashboardWidgetOption;
  dashboardLayout: GridLayOutInstance;

  constructor(
    private dashboardDesignerService: DashboardDesignerService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dashboardDesignerService.selectedLayoutEvent$.subscribe(
      (griditem: GridLayOutInstance) => {
        if (griditem) {
          this.dashboardLayout = griditem;
          // this.activeLayout = griditem;
          this.ref.detectChanges();
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

  // removeItem($event: MouseEvent | TouchEvent, item): void {
  //   $event.preventDefault();
  //   $event.stopPropagation();
  //   this.gridBoxItemList.splice(this.gridBoxItemList.indexOf(item), 1);
  // }

  // addItem(): void {
  //   this.gridBoxItemList.push({
  //     x: 0,
  //     y: 0,
  //     cols: 1,
  //     rows: 1,
  //     hasContent: false
  //   });
  // }
}
