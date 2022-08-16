import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GridLayOutInstance } from '../../models/dashboard.models';
import { DashboardDesignerService } from '../../services/dashboard-designer.service';
import { DashResizeElementEvent } from '../dashboard-resizer/resize-element-event.interface';
import { DashResizeElementDirection } from '../dashboard-resizer/resize-element.enum';
import { TranslationService } from '../../services/translation.service';
import { DashboardIconService } from '../../services/dashboard-icon.service';

@Component({
  selector: 'ngx-dashboard-viewer',
  templateUrl: './ngx-dashboard-viewer.component.html',
  styleUrls: ['./ngx-dashboard-viewer.component.scss']
})
export class DashboardViewerComponent implements OnInit {
  public readonly layoutDirection = DashResizeElementDirection;
  public layout: any = {
    left: { show: true, slideOut: false },
    right: { show: true, slideOut: false },
    top: { show: true, slideOut: false },
    bottom: { show: true, slideOut: false },
    center: { show: true, slideOut: false },
    resizeFn$: new Subject()
  };
  @Input() dashboardLayout: GridLayOutInstance;
  @Input() baseAssetsPath: string;
  @Input() lang: 'en' | 'ar' = 'en';

  constructor(
    private dashboardDesignerService: DashboardDesignerService,
    private translationService: TranslationService,
    private _iconsService: DashboardIconService
  ) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {
    this.translationService.language = this.lang;
    this.setSelectedDashBoardConfig();
  }

  setSelectedDashBoardConfig() {
    const gridItem = new GridLayOutInstance();
    gridItem.setValue(
      false,
      this.dashboardLayout.layoutName,
      this.dashboardLayout.layoutId,
      this.dashboardLayout.dashboardItems,
      null
    );
    this.dashboardDesignerService.emitSelectedLayoutEvent(gridItem);
  }

  public onResize(evt: DashResizeElementEvent, _block: any): void {
    this.layout[_block].width = evt.currentWidthValue;
    this.layout[_block].height = evt.currentHeightValue;
    this.layout[_block].top = evt.currentTopValue;
    this.layout[_block].left = evt.currentLeftValue;
  }

  public resizeEnd(evt: DashResizeElementEvent, _block: any): void {
    this.layout.resizeFn$.next();
  }

  private get icons(): Array<string> {
    return ['menu-ico'];
  }

  ngOnDestroy(): void {
    this.layout.resizeFn$.complete();
  }
}
