import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  ECalendarState,
  IAnualCalendar,
  ICalendar,
  ICalendarMonthClicked, IDayYearViewClicked,
  IMonthlyCalendarDayClicked
} from './calendar.component.interface';
import {moment} from '../../../environments/environment';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html'
})
export class CalendarComponent implements OnInit {
  @Input() state: ECalendarState;
  @Output() stateChange: EventEmitter<ECalendarState>;
  @Output() evtMonthClicked: EventEmitter<ICalendarMonthClicked>;
  @Input() selectedYear: number;
  @Output() selectedYearChange: EventEmitter<number>;
  @Input() selectedMonth: number;
  @Output() selectedMonthChange: EventEmitter<number>;
  @Input() monthlyCalendarData: ICalendar<any>;
  @Input() anualCalendarData: IAnualCalendar<any>;
  @Output() evtDateChanged: EventEmitter<ICalendarMonthClicked>;
  @Output() evtDraggable: EventEmitter<IMonthlyCalendarDayClicked<any>>;
  @Output() evtMonthlyCalendarDay: EventEmitter<IMonthlyCalendarDayClicked<any>>;
  @Output() evtDayYearViewClicked: EventEmitter<Array<IDayYearViewClicked<any>>>;
  @Output() evtDragYearViewClicked: EventEmitter<Array<IDayYearViewClicked<any>>>;

  constructor() {
    this.evtMonthClicked = new EventEmitter<ICalendarMonthClicked>();
    this.selectedMonthChange = new EventEmitter<number>();
    this.selectedYearChange = new EventEmitter<number>();
    this.evtDateChanged = new EventEmitter<ICalendarMonthClicked>();
    this.evtDraggable = new EventEmitter<IMonthlyCalendarDayClicked<any>>();
    this.evtMonthlyCalendarDay = new EventEmitter<IMonthlyCalendarDayClicked<any>>();
    this.evtDayYearViewClicked = new EventEmitter<Array<IDayYearViewClicked<any>>>();
    this.evtDragYearViewClicked = new EventEmitter<Array<IDayYearViewClicked<any>>>();
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

  monthClicked (value: ICalendarMonthClicked) {
    this.evtMonthClicked.emit(value);
  }

  dateChanged(value: ICalendarMonthClicked) {
    this.evtDateChanged.emit(value);
  }

  yearChanged(value: number): void {
    this.selectedYear = value;
    this.selectedYearChange.emit(value);
  }

  evtDraggableClicked(value: IMonthlyCalendarDayClicked<any>): void {
    this.evtDraggable.emit(value);
  }

  evtMonthlyCalendarDayClicked(value: IMonthlyCalendarDayClicked<any>): void {
    this.evtMonthlyCalendarDay.emit(value);
  }

  dayYearViewClicked(value: Array<IDayYearViewClicked<any>>): void {
    this.evtDayYearViewClicked.emit(value);
  }

  dragYearViewClicked(value: Array<IDayYearViewClicked<any>>): void {
    this.evtDragYearViewClicked.emit(value);
  }
}
