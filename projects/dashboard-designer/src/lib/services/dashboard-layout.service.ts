import { EventEmitter, Injectable } from '@angular/core';
import { GridType } from 'angular-gridster2';
import {
  GridLayOutInstance,
  SingleGridBoxItem
} from '../models/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardLayoutService {
  constructor() {}

  getLayoutconfigByLayoutId(layoutid): GridLayOutInstance {
    let layoutJSON: SingleGridBoxItem[] = [];
    const gridItem = new GridLayOutInstance();
    switch (layoutid) {
      case 'new': {
        layoutJSON = [{ x: 0, y: 0, cols: 20, rows: 20, hasContent: true }];
        break;
      }
      case 'Layout1': {
        layoutJSON = [{ x: 0, y: 0, cols: 1, rows: 1, hasContent: true }];
        break;
      }
      case 'Layout2': {
        layoutJSON = [
          { x: 0, y: 0, cols: 1, rows: 1, hasContent: true },
          { x: 1, y: 0, cols: 1, rows: 1, hasContent: true }
        ];

        break;
      }
      case 'Layout3': {
        layoutJSON = [
          { x: 0, y: 0, cols: 1, rows: 1, hasContent: true },
          { x: 1, y: 0, cols: 1, rows: 1, hasContent: true },
          { x: 2, y: 0, cols: 1, rows: 1, hasContent: true }
        ];
        break;
      }
      case 'Layout4': {
        layoutJSON = [
          { x: 0, y: 0, cols: 2, rows: 1, hasContent: true },
          { x: 2, y: 0, cols: 1, rows: 1, hasContent: true }
        ];
        break;
      }
      case 'Layout5': {
        layoutJSON = [
          { x: 0, y: 0, cols: 2, rows: 1, hasContent: true },
          { x: 2, y: 0, cols: 1, rows: 1, hasContent: true }
        ];
        break;
      }
      case 'Layout6': {
        layoutJSON = [
          { x: 0, y: 0, cols: 1, rows: 1, hasContent: true },
          { x: 1, y: 0, cols: 1, rows: 1, hasContent: true },
          { x: 2, y: 0, cols: 1, rows: 1, hasContent: true },
          { x: 3, y: 0, cols: 1, rows: 1, hasContent: true }
        ];
        break;
      }
      case 'Layout7': {
        layoutJSON = [
          { x: 0, y: 0, cols: 2, rows: 1, hasContent: true },
          { x: 0, y: 1, cols: 1, rows: 1, hasContent: true },
          { x: 1, y: 1, cols: 1, rows: 1, hasContent: true }
        ];
        break;
      }
      case 'Layout8': {
        layoutJSON = [
          { x: 0, y: 0, cols: 3, rows: 1, hasContent: true },
          { x: 0, y: 1, cols: 1, rows: 2, hasContent: true },
          { x: 1, y: 1, cols: 1, rows: 2, hasContent: true },
          { x: 2, y: 1, cols: 1, rows: 2, hasContent: true }
        ];
        break;
      }
      case 'Layout9': {
        layoutJSON = [
          { x: 0, y: 0, cols: 3, rows: 1, hasContent: true },
          { x: 0, y: 1, cols: 2, rows: 1, hasContent: true },
          { x: 2, y: 1, cols: 1, rows: 1, hasContent: true }
        ];
        break;
      }
      case 'Layout10': {
        //statements;
        layoutJSON = [
          { x: 0, y: 0, cols: 3, rows: 1, hasContent: true },
          { x: 0, y: 1, cols: 1, rows: 1, hasContent: true },
          { x: 1, y: 1, cols: 2, rows: 1, hasContent: true }
        ];
        break;
      }
      case 'Layout11': {
        layoutJSON = [
          { x: 0, y: 0, cols: 4, rows: 1, hasContent: true },
          { x: 0, y: 1, cols: 1, rows: 1, hasContent: true },
          { x: 1, y: 1, cols: 1, rows: 1, hasContent: true },
          { x: 2, y: 1, cols: 1, rows: 1, hasContent: true },
          { x: 3, y: 1, cols: 1, rows: 1, hasContent: true }
        ];
        break;
      }
      case 'Layout12': {
        layoutJSON = [
          { x: 0, y: 0, cols: 1, rows: 1, hasContent: true },
          { x: 0, y: 1, cols: 2, rows: 1, hasContent: true },
          { x: 1, y: 0, cols: 1, rows: 1, hasContent: true }
        ];
        break;
      }
      case 'Layout13': {
        layoutJSON = [
          { x: 0, y: 0, cols: 1, rows: 1, hasContent: true },
          { x: 0, y: 1, cols: 3, rows: 1, hasContent: true },
          { x: 1, y: 0, cols: 1, rows: 1, hasContent: true },
          { x: 2, y: 0, cols: 1, rows: 1, hasContent: true }
        ];
        break;
      }
      case 'Layout14': {
        layoutJSON = [
          { x: 0, y: 0, cols: 2, rows: 1, hasContent: true },
          { x: 2, y: 0, cols: 1, rows: 1, hasContent: true },
          { x: 0, y: 1, cols: 3, rows: 1, hasContent: true }
        ];
        break;
      }
      case 'Layout15': {
        layoutJSON = [
          { x: 0, y: 0, cols: 1, rows: 1, hasContent: true },
          { x: 0, y: 1, cols: 3, rows: 1, hasContent: true },
          { x: 1, y: 0, cols: 2, rows: 1, hasContent: true }
        ];
        break;
      }
      case 'Layout16': {
        layoutJSON = [
          { x: 0, y: 0, cols: 1, rows: 1, hasContent: true },
          { x: 0, y: 1, cols: 4, rows: 1, hasContent: true },
          { x: 1, y: 0, cols: 1, rows: 1, hasContent: true },
          { x: 2, y: 0, cols: 1, rows: 1, hasContent: true },
          { x: 3, y: 0, cols: 1, rows: 1, hasContent: true }
        ];
        break;
      }
      case 'Layout17': {
        layoutJSON = [
          { x: 0, y: 0, cols: 2, rows: 1, hasContent: true },
          { x: 0, y: 1, cols: 1, rows: 1, hasContent: true },
          { x: 1, y: 1, cols: 1, rows: 1, hasContent: true },
          { x: 0, y: 2, cols: 2, rows: 1, hasContent: true }
        ];
        break;
      }
      case 'Layout18': {
        layoutJSON = [
          { x: 0, y: 0, cols: 3, rows: 1, hasContent: true },
          { x: 0, y: 1, cols: 1, rows: 1, hasContent: true },
          { x: 1, y: 1, cols: 1, rows: 1, hasContent: true },
          { x: 0, y: 2, cols: 3, rows: 1, hasContent: true },
          { x: 2, y: 1, cols: 1, rows: 1, hasContent: true }
        ];
        break;
      }
      case 'Layout19': {
        layoutJSON = [
          { x: 0, y: 0, cols: 3, rows: 1, hasContent: true },
          { x: 0, y: 1, cols: 2, rows: 1, hasContent: true },
          { x: 0, y: 2, cols: 3, rows: 1, hasContent: true },
          { x: 2, y: 1, cols: 1, rows: 1, hasContent: true }
        ];
        break;
      }
      case 'Layout20': {
        layoutJSON = [
          { x: 0, y: 0, cols: 3, rows: 1, hasContent: true },
          { x: 0, y: 1, cols: 1, rows: 1, hasContent: true },
          { x: 0, y: 2, cols: 3, rows: 1, hasContent: true },
          { x: 1, y: 1, cols: 2, rows: 1, hasContent: true }
        ];
        break;
      }
      case 'Layout21': {
        layoutJSON = [
          { x: 0, y: 0, cols: 4, rows: 1, hasContent: true },
          { x: 0, y: 1, cols: 1, rows: 1, hasContent: true },
          { x: 1, y: 1, cols: 1, rows: 1, hasContent: true },
          { x: 0, y: 2, cols: 4, rows: 1, hasContent: true },
          { x: 2, y: 1, cols: 1, rows: 1, hasContent: true },
          { x: 3, y: 1, cols: 1, rows: 1, hasContent: true }
        ];
        break;
      }

      default: {
        //statements;
        layoutJSON = [{ x: 0, y: 0, cols: 1, rows: 1, hasContent: true }];
      }
    }

    if (layoutid != 'new') {
      gridItem.options.gridType = GridType.ScrollVertical;
    }
    gridItem.setValue(true, layoutid, layoutid, layoutJSON, null);
    return gridItem;
  }
}
