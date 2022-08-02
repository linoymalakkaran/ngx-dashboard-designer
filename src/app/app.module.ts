import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { GridsterModule } from 'angular-gridster2';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { TrackByComponent } from './sections/trackBy/trackBy.component';
import { AppComponent } from './app.component';
import { ApiComponent } from './sections/api/api.component';
import { CompactComponent } from './sections/compact/compact.component';
import { DisplayGridComponent } from './sections/displayGrid/displayGrid.component';
import { DragComponent } from './sections/drag/drag.component';
import { DynamicWidgetsComponent } from './sections/dynamicWidgets/dynamicWidgets.component';
import { ParentDynamicComponent } from './sections/dynamicWidgets/parentDynamic.component';
import { WidgetAComponent } from './sections/dynamicWidgets/widgetA.component';
import { WidgetBComponent } from './sections/dynamicWidgets/widgetB.component';
import { WidgetCComponent } from './sections/dynamicWidgets/widgetC.component';
import { EmptyCellComponent } from './sections/emptyCell/emptyCell.component';
import { GridEventsComponent } from './sections/gridEvents/gridEvents.component';
import { GridMarginsComponent } from './sections/gridMargins/gridMargins.component';
import { GridSizesComponent } from './sections/gridSizes/gridSizes.component';
import { GridTypesComponent } from './sections/gridTypes/gridTypes.component';
import { HomeComponent } from './sections/home/home.component';
import { ItemsComponent } from './sections/items/items.component';
import { MiscComponent } from './sections/misc/misc.component';
import { PushComponent } from './sections/push/push.component';
import { ResizeComponent } from './sections/resize/resize.component';
import { RtlComponent } from './sections/rtl/rtl.component';
import { SwapComponent } from './sections/swap/swap.component';
import { MultiLayerComponent } from './sections/multiLayer/multi-layer.component';
import { MatMenuModule } from '@angular/material/menu';
import { TrackByItemComponent } from './sections/trackBy/trackByItem.component';
import { IconsService } from './services/icons.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { NotificationComponent } from './widgets/notification/notification.component';
import { MainLayoutComponent } from './dashboard/components/layout/main-layout/main-layout.component';
import { MainFooterComponent } from './dashboard/components/layout/main-footer/main-footer.component';
import { MainHeaderComponent } from './dashboard/components/layout/main-header/main-header.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'api', component: ApiComponent },
  { path: 'compact', component: CompactComponent },
  { path: 'displayGrid', component: DisplayGridComponent },
  { path: 'drag', component: DragComponent },
  { path: 'dynamicWidgets', component: DynamicWidgetsComponent },
  { path: 'emptyCell', component: EmptyCellComponent },
  { path: 'gridEvents', component: GridEventsComponent },
  { path: 'gridMargins', component: GridMarginsComponent },
  { path: 'gridSizes', component: GridSizesComponent },
  { path: 'gridTypes', component: GridTypesComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'trackBy', component: TrackByComponent },
  { path: 'push', component: PushComponent },
  { path: 'resize', component: ResizeComponent },
  { path: 'swap', component: SwapComponent },
  { path: 'multiLayer', component: MultiLayerComponent },
  { path: 'misc', component: MiscComponent },
  { path: 'rtl', component: RtlComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ApiComponent,
    CompactComponent,
    DisplayGridComponent,
    DragComponent,
    DynamicWidgetsComponent,
    ParentDynamicComponent,
    WidgetAComponent,
    WidgetBComponent,
    WidgetCComponent,
    EmptyCellComponent,
    GridEventsComponent,
    GridMarginsComponent,
    GridSizesComponent,
    GridTypesComponent,
    ItemsComponent,
    PushComponent,
    MultiLayerComponent,
    ResizeComponent,
    SwapComponent,
    TrackByComponent,
    TrackByItemComponent,
    MiscComponent,
    RtlComponent,
    MainLayoutComponent,
    MainFooterComponent,
    MainHeaderComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatSidenavModule,
    DragDropModule,
    MatListModule,
    GridsterModule,
    MatMenuModule,
    MatExpansionModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useValue: { smartypants: true, breaks: true }
      }
    })
  ],

  providers: [IconsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
