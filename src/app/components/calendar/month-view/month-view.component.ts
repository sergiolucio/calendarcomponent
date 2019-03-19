import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {moment} from '../../../../environments/environment';
import {
  ICalendar, ICalendarDay, ICalendarDays,
  ICalendarEventDay, IMonthlyCalendarDayClicked
} from '../calendar.component.interface';
import {ModalService} from '../../../services/modal/modal.service';


@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss']
})
export class MonthViewComponent implements OnInit, OnChanges {

  @Input() activeMonth: number;
  @Input() activeYear: number;
  private _activeData: string;
  private _months: Array<string>;
  @Input() monthlyCalendarData: ICalendar<any>;
  private _mouseDown: boolean;
  private _dragEvtDays: Array<number>;
  private _dragEvtItem: number;
  private _historicoDragEvtDays: Array<number>;
  @Output() evtDraggableClicked: EventEmitter<IMonthlyCalendarDayClicked<any>>;
  @Output() evtMonthlyCalendarDayClicked: EventEmitter<IMonthlyCalendarDayClicked<any>>;

  constructor(
    private readonly _modalService: ModalService
  ) {
    // Define o primeiro dia da semana como segunda
    moment.updateLocale('en', {
      week: {
        dow: 1, // First day of week is Monday
        doy: 4  // First week of year must contain 4 January (7 + 1 - 4)
      }
    });

    this.evtDraggableClicked = new EventEmitter<IMonthlyCalendarDayClicked<any>>();
    this.evtMonthlyCalendarDayClicked = new EventEmitter<IMonthlyCalendarDayClicked<any>>();
  }

  ngOnInit() {
    if (this.activeMonth < 10) {
      const stringMonth: string = '0' + this.activeMonth;
      this._activeData = stringMonth + '-' + this.activeYear;
    } else {
      this._activeData = this.activeMonth + '-' + this.activeYear;
    }
    this._months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ];
    this._mouseDown = false;
  }

  public ngOnChanges({activeMonth, activeYear}: SimpleChanges): void {
    if (activeMonth && !activeMonth.isFirstChange()) {
      this.activeMonth = activeMonth.currentValue;
    }
    if (activeYear && !activeYear.isFirstChange()) {
      this.activeYear = activeYear.currentValue;
    }

    if (this.activeMonth < 10) {
      const stringMonth: string = '0' + this.activeMonth;
      this._activeData = stringMonth + '-' + this.activeYear;
    } else {
      this._activeData = this.activeMonth + '-' + this.activeYear;
    }
  }

  generateDaysOfMonth(): Array<number> {
    const daysAux = moment(this._activeData, 'MM-YYYY').daysInMonth();
    let dayAux: Array<number>;
    dayAux = [];

    for (let i = 0; i < daysAux; i++) {
      dayAux.push(i + 1);
    }

    return dayAux;
  }

  findCurrentMonth(): string {
    return this._months[this.activeMonth - 1];
  }

  findCurrentDay(day: number): string {
    let dayOfWeek: number;
    if (day < 10) {
      dayOfWeek = moment('0' + day + '-' + this._activeData, 'DD-MM-YYYY').weekday();
    } else {
      dayOfWeek = moment(day + '-' + this._activeData, 'DD-MM-YYYY').weekday();
    }

    switch (dayOfWeek) {
      case 0:
        return 'Seg';
      case 1:
        return 'Ter';
      case 2:
        return 'Qua';
      case 3:
        return 'Qui';
      case 4:
        return 'Sex';
      case 5:
        return 'Sab';
      case 6:
        return 'Dom';
    }
  }

  isWeekend(day: number): boolean {

    let stringDay: string;
    let WeekDay: number;

    if (day < 10) {
      stringDay = '0' + day;
    } else {
      stringDay = String(day);
    }

    WeekDay = moment(stringDay + '-' + this._activeData, 'DD-MM-YYYY').weekday();

    if (WeekDay === 5 || WeekDay === 6) {
      return true;
    }

    return false;
  }

  setDinamicClass(day: number, item: number): string {
    let bg: string;

    if (this._dragEvtDays && this.isDragEvtByDay(day, item)) {
      bg = 'bg-info';
    } else if (this.countEvtsByDay(day, item) > 1) {
      bg = 'bg-danger';
    } else if (this.getEvtColor(day, item)) {
      bg = this.getEvtColor(day, item);
    } else if (this.isWeekend(day)) {
      bg = 'bg-weekend';
    } else {
      bg = 'bg-transparent';
    }

    return bg;
  }

  // next methods are to get data to seed calendar

  generateEvtsByDay(day: number, itemIndex: number): Array<ICalendarEventDay<any>> {
    const evtsArray: Array<ICalendarEventDay<any>> = [];

    const keyItemValue = Object.keys(this.monthlyCalendarData.items)[itemIndex];
    const itemValue = this.monthlyCalendarData.items[keyItemValue];

    for (const keyDaysValue of Object.keys(itemValue.days)) {
      const daysValue = itemValue.days[keyDaysValue];

      if (daysValue.day === day) {
        for (const evtsValue of daysValue.events) {
          evtsArray.push(evtsValue);
        }
      }
    }

    return evtsArray;
  }

  countEvtsByDay(day: number, itemIndex: number): number {
    return this.generateEvtsByDay(day, itemIndex).length;
  }

  getEvtColor(day: number, itemIndex: number): string {
    let evtColor: string;

    if (this.generateEvtsByDay(day, itemIndex).length > 0) {
      evtColor = 'bg-' + this.generateEvtsByDay(day, itemIndex)[0].type.color;
    }

    return evtColor;
  }

  // next methods draw new events

  activateMouseDown(day: number, itemIndex: number): void {
    this._dragEvtDays = [];
    this._historicoDragEvtDays = [];

    if (this.countEvtsByDay(day, itemIndex) === 0) {
      this._historicoDragEvtDays.push(day);

      this._dragEvtItem = itemIndex;
      this._dragEvtDays.push(day);
      this._mouseDown = true;
    }
  }

  mouseEnter(day): void {
    if (this._mouseDown) {

      this._historicoDragEvtDays.push(day);
      let incrementing: boolean;

      incrementing = day > this._historicoDragEvtDays[this._historicoDragEvtDays.length - 2];


      if (day >= this._historicoDragEvtDays[0]) {
        this._dragEvtDays = [];
        for (let d = this._historicoDragEvtDays[0]; d <= day; d++) {
          this._dragEvtDays.push(d);
        }
        this._dragEvtDays.sort((a, b) => (a - b));
      }

      // this._dragEvtDays.sort((a, b) => (a - b));
      // if (day > this._dragEvtDays[this._dragEvtDays.length - 1]) {
      //   this._dragEvtDays.push(day);
      // } else if (day < this._dragEvtDays[this._dragEvtDays.length - 1] && !incrementing) {
      //   this._dragEvtDays.pop();
      // }

    }
  }

  desactivateMouseDown(day): void {
    this._mouseDown = false;

    if (
      day >= this._historicoDragEvtDays[0] &&
      this._historicoDragEvtDays &&
      this._historicoDragEvtDays.length > 0 &&
      this.countEvtsByDay(this._historicoDragEvtDays[0], this._dragEvtItem) === 0
    ) {
      this.drawDragEvt(this._dragEvtDays, this._dragEvtItem);
    }

    this._historicoDragEvtDays = [];
    this._dragEvtDays = [];
  }

  drawDragEvt(days: Array<number>, itemIndex: number) {

    if (days.length > 0) {
      const dragEvt: IMonthlyCalendarDayClicked<any> = new class implements IMonthlyCalendarDayClicked<any> {
        public days: Array<ICalendarDay<any>>;
        public item: string;
        public month: number;
        public year: number;
      };

      dragEvt.year = this.activeYear;
      dragEvt.month = this.activeMonth;
      dragEvt.item = Object.keys(this.monthlyCalendarData.items)[itemIndex];
      dragEvt.days = [];

      for (const d of this._dragEvtDays) {
        const daysAux: ICalendarDay<any> = new class implements ICalendarDay<any> {
          public day: number;
          public events: Array<ICalendarEventDay<any>>;
          public isHoliday: boolean;
          public isWeekend: boolean;
        };
        daysAux.day = d;
        daysAux.events = [];
        daysAux.isHoliday = undefined;
        daysAux.isWeekend = undefined;

        dragEvt.days.push(daysAux);
      }

      this.evtDraggableClicked.emit(dragEvt);
    }
  }

  isDragEvtByDay(day: number, item: number): boolean {
    if (this._dragEvtItem === item) {
      for (const d of this._dragEvtDays) {
        if (d === day) {
          return true;
        }
      }
    }

    return false;
  }

  openEvtModal(day: number, itemIndex: number): void {
    if (this.countEvtsByDay(day, itemIndex) > 0) {

      const dayliInfo: IMonthlyCalendarDayClicked<any>  = new class implements IMonthlyCalendarDayClicked<any> {
        public days: Array<ICalendarDay<any>>;
        public item: string;
        public month: number;
        public year: number;
      };

      dayliInfo.item = Object.keys(this.monthlyCalendarData.items)[itemIndex];
      dayliInfo.year = this.activeYear;
      dayliInfo.month = this.activeMonth;
      dayliInfo.days = [];

      const daysAux: ICalendarDay<any> = new class implements ICalendarDay<any> {
        public day: number;
        public events: Array<ICalendarEventDay<any>>;
        public isHoliday: boolean;
        public isWeekend: boolean;
      };

      daysAux.day = day;
      daysAux.events = this.generateEvtsByDay(day, itemIndex);
      daysAux.isHoliday = undefined;
      daysAux.isWeekend = undefined;

      dayliInfo.days.push(daysAux);

      this.evtMonthlyCalendarDayClicked.emit(dayliInfo);
    }
  }
}
