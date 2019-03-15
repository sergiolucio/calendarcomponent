import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ECalendarState, IAnualCalendar, ICalendar, ICalendarItemClicked} from './calendar.component.interface';
import {moment} from '../../../environments/environment';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html'
})
export class CalendarComponent implements OnInit {
  @Input() state: ECalendarState;
  @Output() stateChange: EventEmitter<ECalendarState>;
  @Output() evtMonthClicked: EventEmitter<ICalendarItemClicked>;
  @Input() selectedYear: number;
  @Output() selectedYearChange: EventEmitter<number>;
  @Input() selectedMonth: number;
  @Output() selectedMonthChange: EventEmitter<number>;
  @Input() monthlyCalendarData: ICalendar<any>;
  @Input() anualCalendarData: IAnualCalendar<any>;
  @Output() evtDateChanged: EventEmitter<ICalendarItemClicked>;

  constructor() {
    this.evtMonthClicked = new EventEmitter<ICalendarItemClicked>();
    this.selectedMonthChange = new EventEmitter<number>();
    this.selectedYearChange = new EventEmitter<number>();
    this.evtDateChanged = new EventEmitter<ICalendarItemClicked>();
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

  dateChanged(value: ICalendarItemClicked) {
    this.evtDateChanged.emit(value);
  }

}
