# ngx-dashboard designer

[![npm version](https://github.com/linoymalakkaran/ngx-dashboard-designer/blob/angular-v13/src/assets/github-assets/npm.png)](https://www.npmjs.com/package/ngx-dashboard-designer)

### Angular implementation of ngx-dashboard designer [Demo](http://10.0.98.21/MGDashboardAppUI)

### Requires Angular 13.x

### For other Angular versions check the other branches.

## Install

`npm install ngx-dashboard-designer --save`

Should work out of the box with webpack, respectively angular-cli.

```javascript
import { NgxDashboardDesignerModule } from 'ngx-dashboard-designer';

@NgModule({
  imports: [ NgxDashboardDesignerModule ],
  ...
})
```

## Browser support

What Angular supports [here](https://github.com/angular/angular)

## How to use dashboard designer

```html
<button (click)="saveLayout()">Save Layout</button>
<ngx-dasboard-designer [widgetOptions]="widgetOptions">
</ngx-dasboard-designer>
```

Initialize a simple dashboard:

```typescript
   @ViewChild(NgxDashboardDesigner) ngxDashboardDesigner: NgxDashboardDesigner;
  widgetOptions: IDashboardWidgetOption = {
    ismfeWidgets: true,
    mfeWidgetTypes: [
      {
        displayName: 'Bar Chart',
        icon: 'Barchart',
        description: 'Bar Chart',
        hostUrl: 'http://localhost:5203/remoteEntry.js', // this will be generated using the module federation. Sample Git link is provided,
        componentName: 'SampleBarChartComponent',
        type: 'module',
        exposedModule: './Component'
      }
    ]
  };

  constructor() {}

  saveLayout() {
    const layout = this.ngxDashboardDesigner.getDashboardData;
    console.log(layout);
  }
```

##### Note: The dashboard designer will take all the available space from the parent. It will not size depending on content. The parent of the component needs to have a size.


### Interact with dashboard with drag and drop

you can interact dashboard with drag and drop. 

### Contributors [here](https://github.com/linoymalakkaran/ngx-dashboard-designer/graphs/contributors)

### License

The MIT License

Copyright (c) 2022 Linoy Pappachan Malakkaran  

## Commit format for contributers (husky)
  eg: type: your commit message
  
  - type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum]
