import { Component, OnInit } from '@angular/core';
import { MfeWidgetType } from '../../../../models/dashboard-widget-options.model';

@Component({
  selector: 'lib-dashboard-widget-error-view',
  templateUrl: './dashboard-widget-error-view.component.html',
  styleUrls: ['./dashboard-widget-error-view.component.scss']
})
export class DashboardWidgetErrorViewComponent implements OnInit {
  exceptionDetails: string = '';
  widgetOptions: MfeWidgetType;
  constructor() {}

  ngOnInit(): void {}

  widgetNames(): string {
    return this.widgetOptions.displayName;
  }
}
