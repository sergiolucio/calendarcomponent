import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  ECalendarState,
  IAnualCalendar,
  ICalendar, ICalendarLabels,
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
  @Output() evtMonthClicked: EventEmitter<ICalendarMonthClicked>;
  @Input() selectedYear: number;
  @Output() selectedYearChange: EventEmitter<number>;
  @Input() selectedMonth: number;
  @Output() selectedMonthChange: EventEmitter<number>;
  public activeItem: Array<string>;
  @Input() monthlyCalendarData: ICalendar<any>;
  @Input() anualCalendarData: IAnualCalendar<any>;
  @Output() evtDateChanged: EventEmitter<ICalendarMonthClicked>;
  @Output() evtDraggable: EventEmitter<IMonthlyCalendarDayClicked<any>>;
  @Output() evtMonthlyCalendarDay: EventEmitter<IMonthlyCalendarDayClicked<any>>;
  @Output() evtDayYearViewClicked: EventEmitter<Array<IDayYearViewClicked<any>>>;
  @Output() evtDragYearViewClicked: EventEmitter<Array<IDayYearViewClicked<any>>>;
  @Input() detailsBarLabels: ICalendarLabels;
  @Input() multipleSelect: boolean;

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

    if (!this.activeItem) {
      this.activeItem = [];
      this.activeItem.push(this.generateItemsAvailables()[0]);
    }
  }

  public monthClicked (value: ICalendarMonthClicked): void {
    this.evtMonthClicked.emit(value);
  }

  public dateChanged(value: ICalendarMonthClicked): void {
    this.evtDateChanged.emit(value);
  }

  public evtDraggableClicked(value: IMonthlyCalendarDayClicked<any>): void {
    this.evtDraggable.emit(value);
  }

  public evtMonthlyCalendarDayClicked(value: IMonthlyCalendarDayClicked<any>): void {
    this.evtMonthlyCalendarDay.emit(value);
  }

  public dayYearViewClicked(value: Array<IDayYearViewClicked<any>>): void {
    this.evtDayYearViewClicked.emit(value);
  }

  public dragYearViewClicked(value: Array<IDayYearViewClicked<any>>): void {
    this.evtDragYearViewClicked.emit(value);
  }

  public generateItemsAvailables(): Array<string> {
    let arrayItems: Array<string>;
    arrayItems = [];
    for (const item of Object.keys(this.anualCalendarData.items)) {
      arrayItems.push(item);
    }

    return arrayItems;
  }

  public activeItemChanged(value: Array<string>): void {
    this.activeItem = value;
  }
}
