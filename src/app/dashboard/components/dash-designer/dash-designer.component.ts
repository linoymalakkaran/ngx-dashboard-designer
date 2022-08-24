import { Component, ViewChild } from '@angular/core';
import { IDashboardWidgetOption } from 'projects/dashboard-designer/src/lib/models/dashboard-widget-options.model';
import { NgxDashboardDesigner } from 'projects/dashboard-designer/src/public-api';

@Component({
  selector: 'app-dash-designer',
  templateUrl: './dash-designer.component.html',
  styleUrls: ['./dash-designer.component.scss']
})
export class DashDesignerComponent {
  @ViewChild(NgxDashboardDesigner) ngxDashboardDesigner: NgxDashboardDesigner;
  widgetOptions: IDashboardWidgetOption = {
    ismfeWidgets: true,
    mfeWidgetTypes: [
      {
        displayName: 'Bar Chart',
        icon: 'bar-chart',
        description: 'Bar Chart',
        //'http://127.0.0.1:5555/dashboard-widgets/remoteEntry.js',
        hostUrl: 'http://localhost:5203/remoteEntry.js',
        // hostUrl:
        //   'https://linoymalakkaran.github.io/ngx-dashboard-designer-demo/widgetsv13/remoteEntry.js',
        componentName: 'BarchartWidgetComponent',
        type: 'module',
        exposedModule: './BarChartWidget'
      }
    ]
  };

  constructor() {}

  saveLayout() {
    const layout = this.ngxDashboardDesigner.getDashboardData;
    console.log(layout);
  }
}
