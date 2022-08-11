import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DashIconRegistry } from '../components/icons-loader/utils/icon-registry';

@Injectable({ providedIn: 'root' })
export class DashboardIconService {
  constructor(
    private _iconRegistry: DashIconRegistry,
    private _sanitizer: DomSanitizer
  ) {}

  public registerIcons(icons: Array<string>): void {
    icons.forEach(icon => {
      // @ts-ignore
      this._iconRegistry.addSvgIcon(
        icon,
        this._sanitizer.bypassSecurityTrustResourceUrl(
          `assets/dashboard-designer/images/${icon}.svg`
        )
      );
    });
  }
}
