import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {moment} from '../../../../environments/environment';
import {
  ECalendarWeekDays,
  IAnualCalendarMonth,
  ICalendar,
  ICalendarDay, ICalendarDragEvt,
  ICalendarEventDay, ICalendarItem,
  ICalendarItems
} from '../calendar.component.interface';
import {ModalService} from '../../../services/modal/modal.service';
import {MonthViewModalComponent} from '../month-view-modal/month-view-modal.component';


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
  private _dragEvt: ICalendarDragEvt;
  private _dragEvtDays: Array<number>;
  private _dragEvtItem: number;
  private _historicoDragEvtDays: Array<number>;

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

  generateEvtsByDay(day: number, item: number): Array<ICalendarEventDay<any>> {
    const evtsArray: Array<ICalendarEventDay<any>> = [];

    const keyItemValue = Object.keys(this.monthlyCalendarData.items)[item];
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

  countEvtsByDay(day: number, item: number): number {
    return this.generateEvtsByDay(day, item).length;
  }

  getEvtColor(day: number, item: number): string {
    let evtColor: string;

    if (this.generateEvtsByDay(day, item).length > 0) {
      evtColor = 'bg-' + this.generateEvtsByDay(day, item)[0].type.color;
    }

    return evtColor;
  }

  // next methods draw new events

  activateMouseDown(day: number, item: number): void {
    this._dragEvtDays = [];

    if (!this._historicoDragEvtDays || this.countEvtsByDay(this._historicoDragEvtDays[0], item) === 0) {
      this._historicoDragEvtDays = [];
      this._dragEvtItem = item;
      this._mouseDown = true;
      this._dragEvtDays.push(day);
      this._historicoDragEvtDays.push(day);
    }
  }

  mouseEnter(day): void {

    if (this._mouseDown) {
      this._historicoDragEvtDays.push(day);
      let incrementing: boolean;

      incrementing = day > this._historicoDragEvtDays[this._historicoDragEvtDays.length - 2];

      this._dragEvtDays.sort((a, b) => (a - b));
      if (day > this._dragEvtDays[this._dragEvtDays.length - 1]) {
        this._dragEvtDays.push(day);
      } else if (day < this._dragEvtDays[this._dragEvtDays.length - 1] && !incrementing) {
        this._dragEvtDays.pop();
      }

    }
  }


  desactivateMouseDown(): void {
    this._mouseDown = false;

    if (!this._historicoDragEvtDays || this.countEvtsByDay(this._historicoDragEvtDays[0], this._dragEvtItem) === 0) {
      this.drawDragEvt(this._dragEvtDays, this._dragEvtItem);
    }
  }


  drawDragEvt(days: Array<number>, item: number) {

    if (days.length > 0) {
      this._dragEvt = new class implements ICalendarDragEvt {
        public days: Array<number>;
        public itemIndex: number;
      };

      this._dragEvt.itemIndex = item;
      this._dragEvt.days = this._dragEvtDays;

      const instance = this._modalService.showVanilla(MonthViewModalComponent, {
        modalSize: 'lg'
      });

      instance.componentInstance.dragEvt = this._dragEvt;
      instance.componentInstance.teste = 'sem eventos';

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

  openModal(day: number, itemIndex: number): void {
    if (this.countEvtsByDay(day, itemIndex) > 0) {
      const instance = this._modalService.showVanilla(MonthViewModalComponent, {
        modalSize: 'lg'
      });

      instance.componentInstance.teste = 'com eventos';
    }
  }
}
