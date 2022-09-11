export interface ObservableEventsModel {
  eventsType: MfeEventsTypes;
  data?: any;
}

export enum MfeEventsTypes {
  LOAD_WIDGET = 'LOAD_WIDGET',
  GENERIC = 'GENERIC',
  INITIAL_LOAD_WIDGET = 'INITIAL_LOAD_WIDGET'
}

export interface IMfeOutputModel {
  loadWidgets?: (data: ObservableEventsModel) => void;
}

export interface IMfeInputModel {
  gridData?: {};
  getGridInstance: Function;
}
