import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ICalendarItemClicked} from '../../components/calendar/calendar.component.interface';

@Component({
  selector: 'app-calendar-month-state',
  templateUrl: './calendar.year.state.component.html'
})
export class CalendarYearStateComponent {

  constructor(
    private readonly _router: Router
  ) {
  }

  yearClicked(year: number, month: number): void {
    this._router.navigateByUrl(`/month-view/${year}/${month}`);
  }
}
