import { Subject } from 'rxjs';

export interface Left {
  show: boolean;
  slideOut: boolean;
  [key: string]: any;
}

export interface Right {
  show: boolean;
  slideOut: boolean;
  isShowSettings: boolean;
  [key: string]: any;
}

export interface Top {
  show: boolean;
  slideOut: boolean;
  [key: string]: any;
}

export interface Bottom {
  show: boolean;
  slideOut: boolean;
  [key: string]: any;
}

export interface Center {
  show: boolean;
  slideOut: boolean;
  [key: string]: any;
}

export interface LayoutConfigModel {
  left: Left;
  right: Right;
  top: Top;
  bottom: Bottom;
  center: Center;
  resizeFn$?: any;
  toggleLeft?: any;
  toggleRight?: any;
  [key: string]: any;
}

export const defaultLayoutConfig = JSON.parse(
  JSON.stringify({
    left: { show: true, slideOut: false },
    right: { show: false, slideOut: false, isShowSettings: true },
    top: { show: true, slideOut: false },
    bottom: { show: true, slideOut: false },
    center: { show: true, slideOut: false },
    resizeFn$: new Subject()
  })
);
