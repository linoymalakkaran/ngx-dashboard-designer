import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  GridsterItem,
  GridsterItemComponentInterface
} from 'angular-gridster2';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
export class DashboardWidgetDesignerComponent implements OnInit, OnDestroy {
  private _unsubscribeAll$ = new Subject<any>();
  @Input() widgetOptions?: IDashboardWidgetOption;
  dashboardLayout: IGridLayOutInstance;

  constructor(
    private dashboardDesignerService: DashboardDesignerService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    //   this.itemResize.bind(this))
    this.dashboardDesignerService.selectedLayoutEvent$
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((griditem: GridLayOutInstance) => {
        if (griditem) {
          this.dashboardLayout = griditem;
          this.dashboardLayout.options.itemResizeCallback =
            this.itemResize.bind(this);
        }
      });
  }

  trackBy(index: number, item: GridsterItem): number {
    return item.id;
  }

  public itemResize(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ): void {
    item.width = Math.round(itemComponent.width);
    item.height = Math.round(itemComponent.height);
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
  //   this.dashboardLayout.dashboardItems.splice(this.gridBoxItemList.indexOf(item), 1);
  // }

  // addItem(): void {
  //   this.dashboardLayout.dashboardItems.push({
  //     x: 0,
  //     y: 0,
  //     cols: 1,
  //     rows: 1,
  //     id: this.dashboardLayout.dashboardItems.length,
  //     hasContent: false
  //   });
  // }

  ngOnDestroy() {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }
}
