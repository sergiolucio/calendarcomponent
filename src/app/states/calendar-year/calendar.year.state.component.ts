import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {moment} from '../../../environments/environment';
import {CalendarUtilsService} from '../../services/calendar.utils.service';
import {IAnualCalendar, ICalendarItemClicked} from '../../components/calendar/calendar.component.interface';

@Component({
  selector: 'app-calendar-month-state',
  templateUrl: './calendar.year.state.component.html'
})
export class CalendarYearStateComponent implements OnInit{

  public activeYear: number;
  public anualCalendarData: IAnualCalendar<any>;

  constructor(
    private readonly _router: Router,
    private readonly _calendarUtilsService: CalendarUtilsService
  ) {
  }

  public ngOnInit(): void {
    if (!this.activeYear) {
      this.activeYear = moment().year();
    }

    this._calendarUtilsService.yearRequested = this.activeYear;
    this.anualCalendarData = this._calendarUtilsService.anualCalendar;
  }

  yearClicked(year: number, month: number): void {
    this._router.navigateByUrl(`/month-view/${year}/${month}`);
  }

  dateChanged(value: ICalendarItemClicked): void {
    this.activeYear = value.year;
    this._calendarUtilsService.yearRequested = this.activeYear;
    this.anualCalendarData = this._calendarUtilsService.anualCalendar;
  }

}
