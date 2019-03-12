import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ECalendarState} from './calendar.component.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html'
})
export class CalendarComponent {
  @Input() state: ECalendarState;
  @Output() stateChange: EventEmitter<ECalendarState>;

  public selectedYear: number;
  public selectedMonth: number;

  constructor() {
    this.state = ECalendarState.Year;
  }
}
