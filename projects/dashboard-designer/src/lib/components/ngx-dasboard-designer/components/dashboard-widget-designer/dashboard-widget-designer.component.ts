import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  GridsterItem,
  GridsterItemComponentInterface
} from 'angular-gridster2';
import { IDashboardWidgetOption } from '../../../../models/dashboard-widget-options.model';
import {
  GridLayOutInstance,
  IGridLayOutInstance
} from '../../../../models/dashboard.models';
import { DashboardDesignerService } from '../../../../services/dashboard-designer.service';

@Component({
  selector: 'dashboard-widget-designer',
  templateUrl: './dashboard-widget-designer.component.html',
  styleUrls: ['./dashboard-widget-designer.component.scss']
})
export class DashboardWidgetDesignerComponent implements OnInit {
  @Input() widgetOptions?: IDashboardWidgetOption;
  dashboardLayout: IGridLayOutInstance;

  constructor(
    private dashboardDesignerService: DashboardDesignerService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dashboardDesignerService.selectedLayoutEvent$.subscribe(
      (griditem: GridLayOutInstance) => {
        if (griditem) {
          this.dashboardLayout = griditem;
          (this.dashboardLayout.options.itemResizeCallback =
            this.itemResize.bind(this)),
            // this.activeLayout = griditem;
            this.ref.detectChanges();
        }
      }
    );
  }

  public itemResize(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ): void {
    itemComponent.gridster.curRowHeight +=
      (item.cols * 100 - item.rows) / 10000;
    item.width = Math.round(itemComponent.width);
    item.height = Math.round(itemComponent.height);

    console.log('item resize');
    // if (itemComponent.gridster.curRowHeight > 1) {
    //     this.unitHeight = itemComponent.gridster.curRowHeight;
    // }
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
