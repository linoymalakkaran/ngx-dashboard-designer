export interface headerDetails {
  bearerTokenName: string;
  token: string;
  [key: string]: any;
}

export interface DashboardModuleConfigModel {
  baseAssetsPath?: string;
  fontBaseUrl?: string;
  isDynamicFontLoading?: boolean;
  isRemoteUrlLangEnabled?: boolean;
  headers: headerDetails;
}
