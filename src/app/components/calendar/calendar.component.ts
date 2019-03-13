import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ECalendarState, ICalendarItemClicked} from './calendar.component.interface';
import {moment} from '../../../environments/environment';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html'
})
export class CalendarComponent implements OnInit{
  @Input() state: ECalendarState;
  @Output() stateChange: EventEmitter<ECalendarState>;
  @Output() evtMonthClicked: EventEmitter<ICalendarItemClicked>;
  @Input() selectedYear: number;
  @Input() selectedMonth: number;

  constructor() {


    this.evtMonthClicked = new EventEmitter<ICalendarItemClicked>();
  }

  public ngOnInit(): void {
    if (!this.state) {
      this.state = ECalendarState.Year;
    }

    if (!this.selectedYear) {
      this.selectedYear = moment().year();
    }

    if (!this.selectedMonth) {
      this.selectedMonth = moment().month() + 1;
    }
  }

  monthClicked (value: ICalendarItemClicked) {
    this.evtMonthClicked.emit(value);
  }
}
