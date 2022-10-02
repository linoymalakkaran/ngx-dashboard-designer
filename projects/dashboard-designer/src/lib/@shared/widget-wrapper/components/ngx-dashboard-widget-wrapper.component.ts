import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-dashboard-widget-wrapper',
  templateUrl: './ngx-dashboard-widget-wrapper.component.html',
  styleUrls: ['./ngx-dashboard-widget-wrapper.component.scss']
})
export class NgxDashboardWidgetWrapperComponent implements OnInit {
  @Input() widgetWrapperOptions: any = {
    vScroll: false,
    hScroll: false,
    showHeader: true,
    showFooter: false
  };

  constructor() {}

  ngOnInit(): void {}
}
