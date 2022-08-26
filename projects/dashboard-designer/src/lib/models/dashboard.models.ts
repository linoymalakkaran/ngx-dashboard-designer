import {
  CompactType,
  DisplayGrid,
  Draggable,
  GridsterConfig,
  GridsterItem,
  GridType,
  PushDirections,
  Resizable
} from 'angular-gridster2';
import { MfeWidgetType } from './dashboard-widget-options.model';

export interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}

export interface SingleGridBoxItem {
  x: number;
  y: number;
  cols: number;
  rows: number;
  hasContent: boolean;
  widgetOption?: MfeWidgetType;
  [key: string]: any;
}

export interface IGridLayOutInstance {
  options: Safe;
  layoutName: string;
  layoutDescription: string;
  layoutId: string;
  properties: any;
  dashboardItems: SingleGridBoxItem[];
}

export class GridLayOutInstance implements IGridLayOutInstance {
  options: Safe = {
    gridType: GridType.Fit,
    compactType: CompactType.None,
    margin: 4,
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
    pushDirections: { north: true, east: true, south: true, west: true },
    pushResizeItems: false,
    displayGrid: DisplayGrid.Always,
    disableWindowResize: false,
    disableWarnings: false,
    scrollToNewItems: false
  };

  layoutName = '';
  layoutDescription = '';
  layoutId = null;
  properties = {};
  dashboardItems: SingleGridBoxItem[] = [];

  setValue?(editMode = true, name, id, items, options) {
    this.layoutName = name;
    this.layoutId = id;
    if (items && items.length > 0) {
      this.dashboardItems = items;
    }
    if (!editMode) {
      this.options.draggable = {
        enabled: false
      };
      this.options.resizable = {
        enabled: false
      };
      this.options.displayGrid = DisplayGrid.None;
    }
  }

  changedOptions?(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }
}
