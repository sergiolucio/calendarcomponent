import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import {SidebarModule} from 'ng-sidebar';
import { YearViewComponent } from './year-view/year-view.component';
import { TestComponent } from './test/test.component';



const appRoutes: Routes = [
  { path: 'year-view', component: YearViewComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    YearViewComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }