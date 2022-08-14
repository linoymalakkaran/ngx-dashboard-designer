import { Inject, Injectable, Optional } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DashIconRegistry } from '../components/icons-loader/utils/dash-registry';
import { fontsToLoad } from '../data-provider/fonts/fonts-collection';
import { DASHBOARD_CONFIG } from '../injectors/dashboard-injectors';
import { DashboardModuleConfigModel } from '../models/dashboard-module-config.model';

@Injectable()
export class DashboardIconService {
  baseAssetsPath: string = 'assets/dashboard-designer/';
  fontBaseUrl: string = 'assets/dashboard-designer/';
  fontsToLoad: {
    fontName: string;
    fontUrl: string;
  }[] = fontsToLoad;

  constructor(
    private _iconRegistry: DashIconRegistry,
    private _sanitizer: DomSanitizer,
    @Inject(DASHBOARD_CONFIG)
    private config: DashboardModuleConfigModel
  ) {
    if (this.config?.baseAssetsPath) {
      this.baseAssetsPath = this.config?.baseAssetsPath || this.baseAssetsPath;
    }
    if (this.config?.fontBaseUrl) {
      this.fontBaseUrl = this.config?.fontBaseUrl || this.fontBaseUrl;
    }

    if (this.config?.isDynamicFontLoading) {
      this.registerFonts();
    }
  }

  public registerIcons(icons: Array<string>): void {
    icons.forEach(icon => {
      // @ts-ignore
      this._iconRegistry.addSvgIcon(
        icon,
        this._sanitizer.bypassSecurityTrustResourceUrl(
          `${this.baseAssetsPath}svg/${icon}.svg`
        )
      );
    });
  }

  registerFonts(): void {
    this.fontsToLoad.forEach(font => {
      this.loadFonts(font.fontName, font.fontUrl);
    });
  }

  loadFonts(fontName, fontUrl) {
    let fontFaceObj = new FontFace(
      fontName,
      `url(${this.fontBaseUrl}${fontUrl})`
    );
    fontFaceObj
      .load()
      .then(function (loaded_face) {
        //@ts-ignore
        document.fonts.add(loaded_face);
        document.body.style.fontFamily = fontName;
      })
      .catch(function (error) {
        // error occurred
        console.log(error);
      });
  }
}
