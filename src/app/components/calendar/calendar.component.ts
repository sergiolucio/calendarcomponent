import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  ECalendarState,
  ECalendarWeekDays,
  IAnualCalendar,
  ICalendar,
  ICalendarDataSet,
  ICalendarLabel,
  ICalendarMonthClicked,
  IDayYearViewClicked,
  IMonthlyCalendarDayClicked
} from './calendar.component.interface';
import {moment} from '../../../environments/environment';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html'
})
export class CalendarComponent implements OnInit {
  @Input() public state: ECalendarState;
  @Input() public selectedYear: number;
  @Input() public selectedMonth: number;
  @Input() public monthlyCalendarData: ICalendar<any>;
  @Input() public anualCalendarData: IAnualCalendar<any>;
  @Input() public detailsBarLabels: Array<ICalendarLabel>;
  @Input() public dataSets: ICalendarDataSet;
  @Input() public multipleSelect: boolean;
  @Output() public evtMonthClicked: EventEmitter<ICalendarMonthClicked>;
  @Output() public selectedYearChange: EventEmitter<number>;
  @Output() public selectedMonthChange: EventEmitter<number>;
  @Output() public evtDateChanged: EventEmitter<ICalendarMonthClicked>;
  @Output() public evtDraggable: EventEmitter<IMonthlyCalendarDayClicked<any>>;
  @Output() public evtMonthlyCalendarDay: EventEmitter<IMonthlyCalendarDayClicked<any>>;
  @Output() public evtDayYearViewClicked: EventEmitter<Array<IDayYearViewClicked<any>>>;
  @Output() public evtDragYearViewClicked: EventEmitter<Array<IDayYearViewClicked<any>>>;

  public activeItem: Array<ICalendarDataSet>;

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

    if (!this.anualCalendarData) {
      this.anualCalendarData = {
        items: {},
        weekStartDay: ECalendarWeekDays.MONDAY,
        year: 0
      };
    }

    if (!this.monthlyCalendarData) {
      this.monthlyCalendarData = {
        items: {},
        weekStartDay: ECalendarWeekDays.MONDAY
      };
    }
  }

  public monthClicked(value: ICalendarMonthClicked): void {
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

  public generateItemsAvailables(): Array<ICalendarDataSet> {
    let arrayItems: Array<ICalendarDataSet>;
    arrayItems = [];

    if (!this.anualCalendarData) {
      this.anualCalendarData = {
        items: {},
        weekStartDay: ECalendarWeekDays.MONDAY,
        year: 0
      };
    }

    // todo - verificar
    for (const item of Object.keys(this.anualCalendarData.items)) {
      arrayItems.push({title: item, layers: []});
    }

    return arrayItems;
  }

  public activeItemChanged(value: Array<ICalendarDataSet>): void {
    this.activeItem = value;
  }
}
