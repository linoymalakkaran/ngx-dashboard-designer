import { Component, OnInit, ViewChild } from '@angular/core';
import { IDashboardWidgetOption } from 'projects/dashboard-designer/src/lib/models/dashboard-widget-options.model';
import {
  defaultLayoutConfig,
  LayoutConfigModel,
  NgxDashboardDesignerComponent
} from 'projects/dashboard-designer/src/public-api';
import { DashboardService } from '../../services/dashboard.service';
import { IGridLayOutInstance } from 'projects/dashboard-designer/src/lib/models/dashboard.models';
import { editLayoutJSON } from '../../data-provider/dashboard-edit.data';

@Component({
  selector: 'app-dash-designer',
  templateUrl: './dash-designer.component.html',
  styleUrls: ['./dash-designer.component.scss']
})
export class DashDesignerComponent implements OnInit {
  editLayoutJSON: IGridLayOutInstance = editLayoutJSON;
  layoutConfig: LayoutConfigModel = defaultLayoutConfig;
  @ViewChild(NgxDashboardDesignerComponent)
  ngxDashboardDesigner: NgxDashboardDesignerComponent;
  widgetOptions: IDashboardWidgetOption = {
    mfeWidgetTypes: [
      {
        isMfeWidget: true,
        displayName: 'Bar Chart',
        icon: 'bar-chart',
        description: 'Bar Chart',
        //'http://127.0.0.1:5555/dashboard-widgets/remoteEntry.js',
        // hostUrl: 'http://localhost:5203/remoteEntry.js',
        hostUrl:
          'https://linoymalakkaran.github.io/ngx-dashboard-designer-demo/widgetsv13/remoteEntry.js',
        componentName: 'BarchartWidgetComponent',
        type: 'module',
        exposedModule: './BarChartWidget'
      }
    ]
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.layoutConfig.left = { show: true, slideOut: false };
    this.layoutConfig.top = { show: true, slideOut: false };
  }

  saveLayout() {
    const layout = this.ngxDashboardDesigner.getDashboardData;
    this.dashboardService.layoutInfo = JSON.parse(JSON.stringify(layout));
    alert(
      'Saved successfully, please click on viewer link to see the preview.'
    );
    console.log(layout);
  }
}
