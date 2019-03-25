import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {HammerGestureConfig, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {moment} from '../../../../environments/environment';
import {
  ECalendarMonths,
  IAnualCalendar,
  IAnualCalendarMonth, ICalendarDay,
  ICalendarEventDay, ICalendarLabels,
  ICalendarMonthClicked,
  IDayYearViewClicked
} from '../calendar.component.interface';


@Component({
  selector: 'app-year-view',
  templateUrl: './year-view.component.html',
  styleUrls: ['./year-view.component.scss']
})
export class YearViewComponent implements OnInit, OnChanges {
  @Input() activeYear: number;
  @Output() evtMonthClicked: EventEmitter<ICalendarMonthClicked>;
  @Input() anualCalendarData: IAnualCalendar<any>;
  public months: Array<string>;
  @Output() evtDayYearViewClicked: EventEmitter<Array<IDayYearViewClicked<any>>>;
  @Output() evtDragYearViewClicked: EventEmitter<Array<IDayYearViewClicked<any>>>;
  private _mouseDown: boolean;
  private _startDayDragged: number;
  private _startMonthDragged: number;
  private _daysDragged: Array<ICalendarDay<any>>;
  private _daysDraggedByMonth: IDayYearViewClicked<any>;
  private _daysDraggedByYear: Array<IDayYearViewClicked<any>>;
  @Input() activeItem: Array<string>;
  // mobile drag event variables
  private _dragMobileDaysIndex: number;
  private _dragMobileMonthsIndex: number;
  private _touchPositionX: number;
  private _touchPositionY: number;
  private _cellWidth: number;
  private _cellHeight: number;

  constructor(
  ) {
    this.evtMonthClicked = new EventEmitter<ICalendarMonthClicked>();
    this.evtDayYearViewClicked = new EventEmitter<Array<IDayYearViewClicked<any>>>();
    this.evtDragYearViewClicked = new EventEmitter<Array<IDayYearViewClicked<any>>>();
  }

  public ngOnInit(): void {
    this.months = [
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

    // Define o primeiro dia da semana como segunda
    moment.updateLocale('en', {
      week: {
        dow: 1, // First day of week is Monday
        doy: 4  // First week of year must contain 4 January (7 + 1 - 4)
      }
    });

    this._mouseDown = false;

    this._dragMobileDaysIndex = 1;
    this._dragMobileMonthsIndex = 1;
  }

  public ngOnChanges({activeYear}: SimpleChanges): void {
    if (activeYear && !activeYear.isFirstChange()) {
      this._updateYear(activeYear.currentValue);
    }
  }

  private _updateYear(value: number) {
    this.activeYear = value;
  }

  public generateDaysOfMonth(month: number): Array<number> {
    const daysAux = moment(month + '-' + this.activeYear, 'MM-YYYY').daysInMonth();
    let dayAux: Array<number>;
    dayAux = [];

    for (let i = 0; i < daysAux; i++) {
      dayAux.push(i + 1);
    }

    return dayAux;
  }

  // Descobre o primeiro dia da semana e conta quantos espaços(dias) deve deixar em branco até imprimir.
  public verifyFirstDayOfMonth(month: number): Array<number> {

    let stringMonth: string;
    const daysOff: Array<number> = [];

    if (month < 10) {
      stringMonth = '0' + month;
    } else {
      stringMonth = String(month);
    }

    // Define o primeiro dia da semana como segunda
    moment.updateLocale('en', {
      week: {
        dow: 1, // First day of week is Monday
        doy: 4  // First week of year must contain 4 January (7 + 1 - 4)
      }
    });

    for (let i = 0; i < moment('01-' + stringMonth + '-' + this.activeYear, 'DD-MM-YYYY').weekday(); i++) {
      daysOff.push(i);
    }

    return daysOff;
  }

  private _isWeekend(day: number, month: number): boolean {

    let stringDay: string;
    let stringMonth: string;
    let WeekDay: number;

    if (month < 10) {
      stringMonth = '0' + month;
    } else {
      stringMonth = String(month);
    }

    if (day < 10) {
      stringDay = '0' + day;
    } else {
      stringDay = String(day);
    }

    WeekDay = moment(stringDay + '-' + stringMonth + '-' + this.activeYear, 'DD-MM-YYYY').weekday();

    if (WeekDay === 5 || WeekDay === 6) {
      return true;
    }

    return false;
  }

  public isCurrentMonth(month: number): boolean {
    if (moment().month() === month && moment().year() === this.activeYear) {
      return true;
    }
    return false;
  }

  public monthClicked(month: number): void {
    this.evtMonthClicked.emit({
      year: this.activeYear,
      month: month
    });
  }

  // next methods are to get data to seed calendar in generic view

  private _generateEvtsByDay(day: number, month: number): Array<ICalendarEventDay<any>> {
    const evtsArray: Array<ICalendarEventDay<any>> = [];
    for (const keyItemValue of Object.keys(this.anualCalendarData.items)) {
      const itemValue: IAnualCalendarMonth<any> = <IAnualCalendarMonth <any>>this.anualCalendarData.items[keyItemValue];

      if (itemValue.month === month) {
        for (const keyDaysValue of Object.keys(itemValue.days)) {
          const daysValue = itemValue.days[keyDaysValue];

          if (daysValue.day === day) {
            for (const evtsValue of daysValue.events) {
              evtsArray.push(evtsValue);
            }
          }
        }
      }

    }

    return evtsArray;
  }

  public getEvtColor(day: number, month: number): string {

    let evtColor: string;

    if (this._generateEvtsByDay(day, month).length === 1) {

      evtColor = this._generateEvtsByDay(day, month)[0].type.color;
    } else if (this._generateEvtsByDay(day, month).length > 1) {
      evtColor = '#f96868';
    } else if (this._isWeekend(day, month)) {
      evtColor = '#2196F3';
    }

    if (this._daysDraggedByYear) {
      for (const i of this._daysDraggedByYear) {
        if (i.month === month) {
          for (const d of i.days) {
            if (d.day === day) {
              evtColor = '#a2caee';
            }
          }
        }
      }
    }

    return evtColor;
  }

  // method to send data when a day is clicked

  public dayYearViewClicked(day: number, month: number): void {

    if (this._generateEvtsByDay(day, month).length > 0 ) {

      const evtsArray: Array<IDayYearViewClicked<any>> = [];

      for (const keyItemValue of Object.keys(this.anualCalendarData.items)) {
        const itemValue: IAnualCalendarMonth<any> = <IAnualCalendarMonth<any>>this.anualCalendarData.items[keyItemValue];

        const evtsAux: IDayYearViewClicked<any> = new class implements IDayYearViewClicked<any> {
          public days: Array<ICalendarDay<any>>;
          public item: Array<string>;
          public month: ECalendarMonths;
          public year: number;
        };

        if (itemValue.month === month) {

          for (const keyDaysValue of Object.keys(itemValue.days)) {

            const daysValue = itemValue.days[keyDaysValue];

            if (daysValue.day === day) {
              const daysAux: ICalendarDay<any> = new class implements ICalendarDay<any> {
                public day: number;
                public events: Array<ICalendarEventDay<any>>;
                public isHoliday: boolean;
                public isWeekend: boolean;
              };
              daysAux.isHoliday = undefined;
              daysAux.isWeekend = undefined;
              daysAux.day = day;
              daysAux.events = [];

              for (const evtsValue of daysValue.events) {
                daysAux.events.push(evtsValue);
              }

              evtsAux.item = [];
              evtsAux.item.push(keyItemValue);
              evtsAux.days = [];
              evtsAux.days.push(daysAux);
              evtsAux.month = month;
              evtsAux.year = this.activeYear;
              evtsArray.push(evtsAux);
            }
          }
        }
      }
      this.evtDayYearViewClicked.emit(evtsArray);
    }

  }


  // methods to start dragging events

  public touchStart(day: number, month: number, event: any): void {
    if (this._generateEvtsByDay(day, month).length === 0) {
      this._touchPositionX = event.srcEvent.offsetX;
      this._touchPositionY = event.srcEvent.offsetY;
      this._cellWidth = event.target.clientWidth;
      this._cellHeight = event.target.clientHeight;

      this._startDayDragged = day;
      this._startMonthDragged = month;
      this._daysDragged = [];
      this._daysDraggedByMonth = new class implements IDayYearViewClicked<any> {
        public days: Array<ICalendarDay<any>>;
        public item: Array<string>;
        public month: ECalendarMonths;
        public year: number;
      };

      this._daysDraggedByYear = [];

      const daysDraggedAux: ICalendarDay<any> = new class implements ICalendarDay<any> {
        public day: number;
        public events: Array<ICalendarEventDay<any>>;
        public isHoliday: boolean;
        public isWeekend: boolean;
      };

      daysDraggedAux.day = day;

      this._daysDragged.push(daysDraggedAux);
      this._daysDraggedByMonth.item = this.activeItem;
      this._daysDraggedByMonth.month = month;
      this._daysDraggedByMonth.year = this.activeYear;
      this._daysDraggedByMonth.days = this._daysDragged;

      this._daysDraggedByYear.push(this._daysDraggedByMonth);
    }
  }

  public touching(day: number, month: number, event: any): void {
    if (this._generateEvtsByDay(day, month).length === 0) {
      this._daysDraggedByYear = [];
      this._dragMobileDaysIndex = Math.ceil((event.deltaX + this._touchPositionX) / this._cellWidth);
      this._dragMobileMonthsIndex = Math.ceil((event.deltaY + this._touchPositionY) / this._cellHeight);

      // verifico que estou com o cursor no mesmo mês em que comecei
      if (this._dragMobileMonthsIndex === 1) {

        // verifico que o dia que tenho seleccionado é superior ou igual ao que seleccionei primeiro
        if (this._dragMobileDaysIndex >= 1) {

          // aqui preencho de novo com os dias desde o primeiro seleccionado até onde tenho o cursor
          this._daysDragged = [];

          for (let d = 0; d < this._dragMobileDaysIndex; d++) {
            const daysDraggedAux: ICalendarDay<any> = new class implements ICalendarDay<any> {
              public day: number;
              public events: Array<ICalendarEventDay<any>>;
              public isHoliday: boolean;
              public isWeekend: boolean;
            };


            daysDraggedAux.day = this._startDayDragged + d;


            this._daysDragged.push(daysDraggedAux);
          }
        } else {
          // aqui preencho de novo com os dias desde o primeiro seleccionado até onde tenho o cursor
          this._daysDragged = [];

          for (let d = this._dragMobileDaysIndex - 1; d < 1; d++) {
            const daysDraggedAux: ICalendarDay<any> = new class implements ICalendarDay<any> {
              public day: number;
              public events: Array<ICalendarEventDay<any>>;
              public isHoliday: boolean;
              public isWeekend: boolean;
            };

            daysDraggedAux.day = this._startDayDragged + d;
            this._daysDragged.push(daysDraggedAux);
          }
        }

        // aqui cria um objeto com os dias seleccionados para o mês atual
        this._daysDraggedByMonth = new class implements IDayYearViewClicked<any> {
          public days: Array<ICalendarDay<any>>;
          public item: Array<string>;
          public month: ECalendarMonths;
          public year: number;
        };

        this._daysDraggedByMonth.year = this.activeYear;
        this._daysDraggedByMonth.month = month;
        this._daysDraggedByMonth.item = this.activeItem;
        this._daysDraggedByMonth.days = [];

        for (const days of this._daysDragged) {
          this._daysDraggedByMonth.days.push(days);
        }

        this._daysDraggedByYear.push(this._daysDraggedByMonth);

      } else if (this._dragMobileMonthsIndex > 1) {

        let firsDay: number = this._startDayDragged;

        // vou percorrer todos os meses até onde tenho o cursor
        for (let m = 0; m < this._dragMobileMonthsIndex; m++) {
          let daysOfMonth: number = this.generateDaysOfMonth(this._startMonthDragged + m).length;

          // apanha a última iteração - onde tenho o cursor
          if (m === this._dragMobileMonthsIndex - 1) {
            // os meses começam em indices de células diferentes
            // tenho que apanhar o nº de espaços em brancos para achar o index correcto do dia pretendido
            const indexFirstDayCurretMonth = this.verifyFirstDayOfMonth(this._startMonthDragged + m).length;
            const indexFirstDayStartMonth = this.verifyFirstDayOfMonth(this._startMonthDragged).length;
            const indexReset: number = indexFirstDayCurretMonth - indexFirstDayStartMonth;
            daysOfMonth = this._startDayDragged + this._dragMobileDaysIndex - 1 - indexReset;
          }

          // aqui preencho de novo com os dias desde o primeiro seleccionado até ao fim do mês ou onde tenha o cursor
          this._daysDragged = [];


          for (let d = firsDay; d <= daysOfMonth; d++) {
            const daysDraggedAux: ICalendarDay<any> = new class implements ICalendarDay<any> {
              public day: number;
              public events: Array<ICalendarEventDay<any>>;
              public isHoliday: boolean;
              public isWeekend: boolean;
            };

            daysDraggedAux.day = d;
            this._daysDragged.push(daysDraggedAux);
          }

          // na primeira iteração deixamos ficar esta variável com o dia que foi primeiro seleccionado
          // após a primeira iteração o primeiro dia passa a ser dia 1
          firsDay = 1;

          // aqui cria um objeto com os dias seleccionados para cada mês e adiciona ao array do ano
          this._daysDraggedByMonth = new class implements IDayYearViewClicked<any> {
            public days: Array<ICalendarDay<any>>;
            public item: Array<string>;
            public month: ECalendarMonths;
            public year: number;
          };

          this._daysDraggedByMonth.year = this.activeYear;
          this._daysDraggedByMonth.month = this._startMonthDragged + m;
          this._daysDraggedByMonth.item = this.activeItem;
          this._daysDraggedByMonth.days = [];

          for (const days of this._daysDragged) {
            this._daysDraggedByMonth.days.push(days);
          }

          this._daysDraggedByYear.push(this._daysDraggedByMonth);
        }
      } else {

        // vou percorrer todos os meses até onde tenho o cursor
        for (let m = this._dragMobileMonthsIndex - 1; m < 1; m++) {

          let dayToStart = 1;

          if (m === this._dragMobileMonthsIndex - 1) {
            // os meses começam em indices de células diferentes
            // tenho que apanhar o nº de espaços em brancos para achar o index correcto do dia pretendido
            const indexFirstDayCurretMonth = this.verifyFirstDayOfMonth(this._startMonthDragged + m).length;
            const indexFirstDayStartMonth = this.verifyFirstDayOfMonth(this._startMonthDragged).length;
            const indexReset: number = indexFirstDayCurretMonth - indexFirstDayStartMonth;

            dayToStart = this._startDayDragged + this._dragMobileDaysIndex - 1 - indexReset;
          }

          let dayToStop: number = this.generateDaysOfMonth(this._startMonthDragged + m).length;

          if (m === 0) {
            dayToStop = this._startDayDragged;
          }

          // aqui preencho de novo com os dias desde o primeiro seleccionado até ao fim do mês ou onde tenha o cursor
          this._daysDragged = [];


          for (let d = dayToStart; d <= dayToStop; d++) {
            const daysDraggedAux: ICalendarDay<any> = new class implements ICalendarDay<any> {
              public day: number;
              public events: Array<ICalendarEventDay<any>>;
              public isHoliday: boolean;
              public isWeekend: boolean;
            };

            daysDraggedAux.day = d;
            this._daysDragged.push(daysDraggedAux);
          }


          // aqui cria um objeto com os dias seleccionados para cada mês e adiciona ao array do ano
          this._daysDraggedByMonth = new class implements IDayYearViewClicked<any> {
            public days: Array<ICalendarDay<any>>;
            public item: Array<string>;
            public month: ECalendarMonths;
            public year: number;
          };

          this._daysDraggedByMonth.year = this.activeYear;
          this._daysDraggedByMonth.month = this._startMonthDragged + m;
          this._daysDraggedByMonth.item = this.activeItem;
          this._daysDraggedByMonth.days = [];

          for (const days of this._daysDragged) {
            this._daysDraggedByMonth.days.push(days);
          }

          this._daysDraggedByYear.push(this._daysDraggedByMonth);
        }
      }
    }
  }

  public touchEnd(day: number, month: number, event: any): void {
    if (this._generateEvtsByDay(day, month).length === 0) {

      if (this._daysDraggedByYear.length > 0) {
        this.evtDragYearViewClicked.emit(this._daysDraggedByYear);
      } else {
        this._daysDraggedByYear.push(this._daysDraggedByMonth);
        this.evtDragYearViewClicked.emit(this._daysDraggedByYear);
      }
      this._daysDraggedByYear = [];
    }
  }
}


