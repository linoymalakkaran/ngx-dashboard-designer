export interface MfeWidgetType {
  displayName: string;
  icon: string;
  description: string;
  hostUrl: string;
  componentName: string;
  type: string;
  exposedModule: string;
  isMfeWidget: boolean;
}

export interface IDashboardWidgetOption {
  filter?: boolean;
  widgetTypes?: string[];
  mfeWidgetTypes: MfeWidgetType[];
}
