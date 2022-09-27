const {
  shareAll,
  share,
  withModuleFederationPlugin
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  // shared: share({
  //   '@angular/core': {
  //     singleton: true,
  //     strictVersion: true,
  //     requiredVersion: 'auto'
  //   },
  //   '@angular/common': {
  //     singleton: true,
  //     strictVersion: true,
  //     requiredVersion: 'auto'
  //   },
  //   '@angular/common/http': {
  //     singleton: true,
  //     strictVersion: true,
  //     requiredVersion: 'auto'
  //   },
  //   '@angular/router': {
  //     singleton: true,
  //     strictVersion: true,
  //     requiredVersion: 'auto'
  //   }
  // }),
  // shared: [
  //   "@angular/animations",
  //   "@angular/common",
  //   "@angular/compiler",
  //   "@angular/core",
  //   "@angular/flex-layout",
  //   "@angular/forms",
  //   "@angular/material",
  //   "@angular/platform-browser",
  //   "@angular/platform-browser-dynamic",
  //   "@angular/router",
  //   "rxjs",
  // ],
  // shared: {
  //   ...shareAll({
  //     singleton: false,
  //     strictVersion: true,
  //     requiredVersion: "auto",
  //   }),
  // },
});
