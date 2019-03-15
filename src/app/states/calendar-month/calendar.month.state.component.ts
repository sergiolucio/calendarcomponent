import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Route, Router} from '@angular/router';
import {ICalendar, ICalendarItemClicked} from '../../components/calendar/calendar.component.interface';
import {CalendarUtilsService} from '../../services/calendar.utils.service';
import {Location} from '@angular/common';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-calendar-month-state',
  templateUrl: './calendar.month.state.component.html'
})
export class CalendarMonthStateComponent implements OnInit {
  public activeYear: number;
  public activeMonth: number;
  public monthlyCalendarData: ICalendar<any>;

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _calendarUtilsService: CalendarUtilsService,
    private readonly _location: Location
  ) {
  }

  public ngOnInit(): void {
    this._activatedRoute.paramMap
      .pipe(first())
      .subscribe((params: ParamMap) => {
        this.activeMonth = +params.get('month');
        this.activeYear = +params.get('year');
      });

    this._calendarUtilsService.monthRequested = this.activeMonth;
    this._calendarUtilsService.yearRequested = this.activeYear;
    this.monthlyCalendarData = this._calendarUtilsService.montlhyCalendar;
  }

  dateChanged(value: ICalendarItemClicked) {
    this.activeYear = value.year;
    this.activeMonth = value.month;
    this._calendarUtilsService.monthRequested = this.activeMonth;
    this._calendarUtilsService.yearRequested = this.activeYear;
    this.monthlyCalendarData = this._calendarUtilsService.montlhyCalendar;
    this._location.replaceState(`/month-view/${this.activeYear}/${this.activeMonth}`);
  }
}
