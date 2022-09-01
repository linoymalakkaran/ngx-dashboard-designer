export interface MfeWidgetType {
  displayName: string;
  icon: string;
  description: string;
  hostUrl: string;
  componentName: string;
  type: string;
  exposedModule: string;
  id?:string;
}

export interface IDashboardWidgetOption {
  filter?: boolean;
  ismfeWidgets: boolean;
  widgetTypes?: string[];
  mfeWidgetTypes: MfeWidgetType[];
}
