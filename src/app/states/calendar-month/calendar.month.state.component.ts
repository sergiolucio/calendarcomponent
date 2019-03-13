import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ICalendarItemClicked} from '../../components/calendar/calendar.component.interface';

@Component({
  selector: 'app-calendar-month-state',
  templateUrl: './calendar.month.state.component.html'
})
export class CalendarMonthStateComponent implements OnInit {
  public activeYear: number;
  public activeMonth: number;

  constructor(
    private readonly _activatedRoute: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.activeYear = +params.get('year');
      this.activeMonth = +params.get('month');
    });
  }
}
