# ngx-dashboard designer

[![npm version](https://github.com/linoymalakkaran/ngx-dashboard-designer/blob/angular-v13/src/assets/github-assets/npm.png)](https://www.npmjs.com/package/ngx-dashboard-designer)

### Angular implementation of ngx-dashboard designer [Demo git repo](https://github.com/linoymalakkaran/ngx-dashboard-designer-demo/tree/main)

### Requires Angular 13.x

### For other Angular versions check the other branches.

## Install

`npm install ngx-dashboard-designer --save`

Should work out of the box with webpack, respectively angular-cli.

```javascript
import { NgxDashboardDesignerModule } from 'ngx-dashboard-designer';

const dashboardConfig: DashboardModuleConfigModel = {
  baseAssetsPath: 'assets/dashboard-designer/',
  fontBaseUrl: 'assets/dashboard-designer/',
  isDynamicFontLoading: false,
  isRemoteUrlLangEnabled: false
};

@NgModule({
  imports: [ NgxDashboardDesignerModule.forRoot(dashboardConfig) ],
  ...
})
```

## Browser support

What Angular supports [here](https://github.com/angular/angular)

## How to use dashboard designer

### Dashboard dashDesigner

```html
<button (click)="saveLayout()">Save Layout</button>
<ngx-dasboard-designer [widgetOptions]="widgetOptions" [lang]="'en'">
</ngx-dasboard-designer>
```

Initialize a simple dashboard:

```typescript
  @ViewChild(NgxDashboardDesigner) ngxDashboardDesigner: NgxDashboardDesigner;
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

  saveLayout() {
    const layout = this.ngxDashboardDesigner.getDashboardData;
    this.dashboardService.layoutData = layout;
    alert(
      'Saved successfully, please click on viewer link to see the preview.'
    );
    console.log(layout);
  }
```

### Dashboard viewer

```html
<ngx-dashboard-viewer
  [dashboardLayout]="dashboardLayout"
  [lang]="'en'"
></ngx-dashboard-viewer>
```

Initialize a simple dashboard:

```typescript
  dashboardLayout: IGridLayOutInstance;

  constructor() {}

  ngOnInit(): void {
    this.dashboardLayout = layoutData;
  }

  export const layoutData: GridLayOutInstance = {
  options: {
    gridType: 'fit',
    compactType: 'none',
    margin: 10,
    outerMargin: true,
    outerMarginTop: null,
    outerMarginRight: null,
    outerMarginBottom: null,
    outerMarginLeft: null,
    useTransformPositioning: true,
    mobileBreakpoint: 640,
    useBodyForBreakpoint: false,
    minCols: 1,
    maxCols: 100,
    minRows: 1,
    maxRows: 100,
    maxItemCols: 100,
    minItemCols: 1,
    maxItemRows: 100,
    minItemRows: 1,
    maxItemArea: 2500,
    minItemArea: 1,
    defaultItemCols: 1,
    defaultItemRows: 1,
    fixedColWidth: 105,
    fixedRowHeight: 105,
    keepFixedHeightInMobile: false,
    keepFixedWidthInMobile: false,
    scrollSensitivity: 10,
    scrollSpeed: 20,
    enableEmptyCellClick: false,
    enableEmptyCellContextMenu: false,
    enableEmptyCellDrop: false,
    enableEmptyCellDrag: false,
    enableOccupiedCellDrop: false,
    emptyCellDragMaxCols: 50,
    emptyCellDragMaxRows: 50,
    ignoreMarginInRow: false,
    draggable: {
      enabled: true
    },
    resizable: {
      enabled: true
    },
    swap: false,
    pushItems: true,
    disablePushOnDrag: false,
    disablePushOnResize: false,
    pushDirections: {
      north: true,
      east: true,
      south: true,
      west: true
    },
    pushResizeItems: false,
    displayGrid: 'always',
    disableWindowResize: false,
    disableWarnings: false,
    scrollToNewItems: false,
    api: {}
  },
  layoutName: 'Layout8',
  layoutDescription: '',
  layoutId: 'Layout8',
  properties: {},
  dashboardItems: [
    {
      x: 0,
      y: 0,
      cols: 3,
      rows: 1,
      hasContent: true,
      widgetOption: {
        isMfeWidget: true,
        displayName: 'Bar Chart',
        icon: 'bar-chart',
        description: 'Bar Chart',
        hostUrl:
          'https://linoymalakkaran.github.io/ngx-dashboard-designer-demo/widgetsv13/remoteEntry.js',
        componentName: 'BarchartWidgetComponent',
        type: 'module',
        exposedModule: './BarChartWidget'
      }
    },
    {
      x: 0,
      y: 1,
      cols: 1,
      rows: 2,
      hasContent: true,
      widgetOption: {
        isMfeWidget: true,
        displayName: 'Bar Chart',
        icon: 'bar-chart',
        description: 'Bar Chart',
        hostUrl:
          'https://linoymalakkaran.github.io/ngx-dashboard-designer-demo/widgetsv13/remoteEntry.js',
        componentName: 'BarchartWidgetComponent',
        type: 'module',
        exposedModule: './BarChartWidget'
      }
    },
    {
      x: 1,
      y: 1,
      cols: 1,
      rows: 2,
      hasContent: true
    },
    {
      x: 2,
      y: 1,
      cols: 1,
      rows: 2,
      hasContent: true
    }
  ]
};

```

##### Note: The dashboard designer will take all the available space from the parent. It will not size depending on content. The parent of the component needs to have a size.

### Interact with dashboard with drag and drop

you can interact dashboard with drag and drop.

### Contributors [here](https://github.com/linoymalakkaran/ngx-dashboard-designer/graphs/contributors)

### License

The MIT License

Copyright (c) 2022 Linoy Pappachan Malakkaran

## Commit format for contributers (husky)

eg: type: your commit message

- type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum]
