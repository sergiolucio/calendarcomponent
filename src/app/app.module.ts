import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {SidebarModule} from 'ng-sidebar';
import {YearViewComponent} from './components/calendar/year-view/year-view.component';
import {DetailsBarComponent} from './components/calendar/details-bar/details-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {YearViewModalComponent} from './components/calendar/year-view-modal/year-view-modal.component';
import { MonthViewComponent } from './components/calendar/month-view/month-view.component';
import {CalendarYearStateComponent} from './states/calendar-year/calendar.year.state.component';
import {CalendarMonthStateComponent} from './states/calendar-month/calendar.month.state.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import { MonthDraggableModelComponent } from './states/calendar-month/month-draggable-model/month-draggable-model.component';
import { DailyInfoModalComponent } from './states/calendar-month/daily-info-modal/daily-info-modal.component';


const appRoutes: Routes = [
  {path: 'year-view', component: CalendarYearStateComponent},
  {path: 'year-view/:year', component: CalendarYearStateComponent},
  {path: 'month-view', component: CalendarMonthStateComponent},
  {path: 'month-view/:year', component: CalendarMonthStateComponent},
  {path: 'month-view/:year/:month', component: CalendarMonthStateComponent},
  {path: '', redirectTo: 'year-view', pathMatch: 'full'},
  {path: '**', redirectTo: 'year-view', pathMatch: 'full'}

];


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SidebarModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    )
  ],
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarYearStateComponent,
    CalendarMonthStateComponent,
    YearViewComponent,
    DetailsBarComponent,
    YearViewModalComponent,
    MonthViewComponent,
    MonthDraggableModelComponent,
    DailyInfoModalComponent
  ],
  entryComponents: [
    YearViewModalComponent,
    MonthDraggableModelComponent,
    DailyInfoModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule {
}
