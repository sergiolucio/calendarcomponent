import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Route, Router} from '@angular/router';
import {ICalendar} from '../../components/calendar/calendar.component.interface';
import {CalendarUtilsService} from '../../services/calendar.utils.service';
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
    private readonly _calendarUtilsService: CalendarUtilsService
  ) {
  }

  public ngOnInit(): void {
    this._activatedRoute.paramMap
      .pipe(first())
      .subscribe((params: ParamMap) => {
        this.activeYear = +params.get('year');
        this.activeMonth = +params.get('month');
      });

    this._calendarUtilsService.monthRequested = this.activeMonth;
    this.monthlyCalendarData = this._calendarUtilsService.montlhyCalendar;

    // this._router.navigate(['month', '1'], {relativeTo: this._activatedRoute});
  }
}
