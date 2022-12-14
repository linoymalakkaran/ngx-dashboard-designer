import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GridLayOutInstance } from '../../models';
import { DashboardDesignerService } from '../../services/dashboard-designer.service';
import { DashboardIconService } from '../../services/dashboard-icon.service';

@Component({
  selector: 'app-right-block',
  templateUrl: './right-block.component.html',
  styleUrls: ['./right-block.component.scss']
})
export class RightBlockComponent implements OnInit, OnDestroy {
  private _unsubscribeAll$ = new Subject<any>();
  dashboardLayout: GridLayOutInstance;

  constructor(
    private dashboardDesignerService: DashboardDesignerService,
    private _iconsService: DashboardIconService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.dashboardDesignerService.selectedLayoutEvent$
      .pipe(takeUntil(this._unsubscribeAll$))
      .subscribe((griditem: GridLayOutInstance) => {
        if (griditem) {
          this.dashboardLayout = griditem;
        }
      });
  }

  changeDir(e) {
    if (e == 'rtl') {
      document.body.setAttribute('dir', 'rtl');
    } else {
      document.body.removeAttribute('dir');
    }
    this.changedOptions();
  }

  changeGridSize(val): void {
    this.dashboardLayout.options.fixedRowHeight = val;
    this.dashboardLayout.options.fixedColWidth = val;
    this.changedOptions();
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

  ngOnDestroy() {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }
}
