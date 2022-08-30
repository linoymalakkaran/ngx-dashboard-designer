import { CompactType, DisplayGrid, GridType } from 'angular-gridster2';
import {
  GridLayOutInstance,
  IGridLayOutInstance,
  Safe
} from 'projects/dashboard-designer/src/lib/models/dashboard.models';

const options: Safe = {
  gridType: GridType.Fit,
  compactType: CompactType.None,
  margin: 2,
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
    enabled: false
  },
  swap: false,
  pushItems: true,
  disablePushOnDrag: false,
  disablePushOnResize: false,
  pushDirections: { north: true, east: true, south: true, west: true },
  pushResizeItems: false,
  displayGrid: DisplayGrid.OnDragAndResize,
  disableWindowResize: false,
  disableWarnings: false,
  scrollToNewItems: false
};

export const editLayoutJSON: IGridLayOutInstance = {
  options: options,
  layoutName: 'Layout8',
  layoutDescription: '',
  layoutId: 'Layout8',
  properties: { autoHeight: false },
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
