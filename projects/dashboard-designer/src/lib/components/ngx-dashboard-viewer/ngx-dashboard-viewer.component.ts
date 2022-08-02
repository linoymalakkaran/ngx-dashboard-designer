import { Component, Input, OnInit } from '@angular/core';
import {
  AngularResizeElementDirection,
  AngularResizeElementEvent
} from 'angular-resize-element';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {
  GridsterConfig,
  Draggable,
  Resizable,
  PushDirections
} from 'angular-gridster2';
import { IDashboardWidgetOption } from '../../models/dashboard-widget-options.model';
import { GridLayOutInstance } from '../../models/dashboard.models';
import { DashboardDesignerService } from '../../services/dashboard-designer.service';

interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}

@Component({
  selector: 'ngx-dashboard-viewer',
  templateUrl: './ngx-dashboard-viewer.component.html',
  styleUrls: ['./ngx-dashboard-viewer.component.scss']
})
export class DashboardViewerComponent implements OnInit {
  public readonly layoutDirection = AngularResizeElementDirection;
  public layout: any = {
    left: { show: true, slideOut: false },
    right: { show: true, slideOut: false },
    top: { show: true, slideOut: false },
    bottom: { show: true, slideOut: false },
    center: { show: true, slideOut: false },
    resizeFn$: new Subject()
  };
  @Input() dashboardLayout: GridLayOutInstance;
  widgetOptions: IDashboardWidgetOption = {
    filter: false,
    ismfeWidgets: true,
    widgetTypes: null,
    mfeWidgetTypes: null
  };

  constructor(
    private dashboardDesignerService: DashboardDesignerService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
  }

  ngOnInit(): void {
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

  public onResize(evt: AngularResizeElementEvent, _block: any): void {
    this.layout[_block].width = evt.currentWidthValue;
    this.layout[_block].height = evt.currentHeightValue;
    this.layout[_block].top = evt.currentTopValue;
    this.layout[_block].left = evt.currentLeftValue;
  }

  public resizeEnd(evt: AngularResizeElementEvent, _block: any): void {
    this.layout.resizeFn$.next();
  }

  ngOnDestroy(): void {
    this.layout.resizeFn$.complete();
  }
}
