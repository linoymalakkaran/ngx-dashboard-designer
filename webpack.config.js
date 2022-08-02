const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const share = mf.share;
const dependencies = require('./package.json').dependencies;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, 'tsconfig.json'), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: 'gridsterApp',
    publicPath: 'auto'
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases()
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
      library: { type: 'module' },

      // For remotes (please adjust)
      // name: "gridsterApp",
      // filename: "remoteEntry.js",
      // exposes: {
      //     './Component': './/src/app/app.component.ts',
      // },

      // For hosts (please adjust)
      // remotes: {
      //     "mfe1": "http://localhost:3000/remoteEntry.js",

      // },

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
      //   },

      //   ...sharedMappings.getDescriptors()
      // })
      shared: {
        '@angular/common/http': {
          version: dependencies['@angular/common'],
          requiredVersion: dependencies['@angular/common'],
          singleton: true
        },
        '@angular/common': {
          version: dependencies['@angular/common'],
          requiredVersion: dependencies['@angular/common'],
          singleton: true
        },
        '@angular/core': {
          version: dependencies['@angular/core'],
          requiredVersion: dependencies['@angular/core'],
          singleton: true
        },
        '@angular/platform-browser': {
          version: dependencies['@angular/platform-browser'],
          requiredVersion: dependencies['@angular/platform-browser'],
          singleton: true
        },
        '@angular/platform-browser-dynamic': {
          version: dependencies['@angular/platform-browser-dynamic'],
          requiredVersion: dependencies['@angular/platform-browser-dynamic'],
          singleton: true
        },
        '@angular/router': {
          version: dependencies['@angular/router'],
          requiredVersion: dependencies['@angular/router'],
          singleton: true
        },
        '@angular/animations': {
          version: dependencies['@angular/animations'],
          requiredVersion: dependencies['@angular/animations'],
          singleton: true
        },
        '@angular/forms': {
          version: dependencies['@angular/forms'],
          requiredVersion: dependencies['@angular/forms'],
          singleton: true
        }
        // ...shareAll({
        //   singleton: true,
        //   strictVersion: true,
        //   requiredVersion: "auto",
        // }),
      }
    }),
    sharedMappings.getPlugin()
  ]
};
