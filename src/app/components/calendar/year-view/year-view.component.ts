import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {moment} from '../../../../environments/environment';
import {ModalService} from '../../../services/modal/modal.service';
import {
  ECalendarMonths,
  IAnualCalendar,
  IAnualCalendarMonth, ICalendarDay,
  ICalendarEventDay,
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
  private _mouseActive: boolean;
  private _startDayDragged: number;
  private _startMonthDragged: number;
  private _daysDragged: Array<ICalendarDay<any>>;
  private _daysDraggedByMonth: IDayYearViewClicked<any>;
  private _daysDraggedByYear: Array<IDayYearViewClicked<any>>;

  constructor(
  ) {
    this.evtMonthClicked = new EventEmitter<ICalendarMonthClicked>();
    this.evtDayYearViewClicked = new EventEmitter<Array<IDayYearViewClicked<any>>>();
    this.evtDragYearViewClicked = new EventEmitter<Array<IDayYearViewClicked<any>>>();
  }

  ngOnInit() {
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

    this._mouseActive = false;
  }

  public ngOnChanges({activeYear}: SimpleChanges): void {
    if (activeYear && !activeYear.isFirstChange()) {
      this.updateYear(activeYear.currentValue);
    }
  }

  updateYear(value: number) {
    this.activeYear = value;
  }

  generateDaysOfMonth(month: number): Array<number> {
    const daysAux = moment(month + '-' + this.activeYear, 'MM-YYYY').daysInMonth();
    let dayAux: Array<number>;
    dayAux = [];

    for (let i = 0; i < daysAux; i++) {
      dayAux.push(i + 1);
    }

    return dayAux;
  }

  // Descobre o primeiro dia da semana e conta quantos espaços(dias) deve deixar em branco até imprimir.
  verifyFirstDayOfMonth(month: number): Array<number> {

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

  isWeekend(day: number, month: number): boolean {

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

  isCurrentMonth(month: number): boolean {
    if (moment().month() === month && moment().year() === this.activeYear) {
      return true;
    }
    return false;
  }

  monthClicked(month: number): void {
    this.evtMonthClicked.emit({
      year: this.activeYear,
      month: month
    });
  }

  // next methods are to get data to seed calendar in generic view

  generateEvtsByDay(day: number, month: number): Array<ICalendarEventDay<any>> {
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

  countEvtsByDay(day: number, month: number): number {
    return this.generateEvtsByDay(day, month).length;
  }

  getEvtColor(day: number, month: number): string {
    let evtColor: string;

    if (this.generateEvtsByDay(day, month).length === 1) {

      evtColor = 'bg-' + this.generateEvtsByDay(day, month)[0].type.color;
    } else if (this.generateEvtsByDay(day, month).length > 1) {
      evtColor = 'bg-danger';
    } else if (this.isWeekend(day, month)) {
      evtColor = 'bg-weekend';
    }

    if (this._daysDraggedByYear) {
      for (const i of this._daysDraggedByYear) {
        if (i.month === month) {
          for (const d of i.days) {
            if (d.day === day) {
              evtColor = 'bg-info';
            }
          }
        }
      }
    }

    return evtColor;
  }

  // method to send data when a day is clicked

  dayYearViewClicked(day: number, month: number): void {

    if (this.generateEvtsByDay(day, month).length === 0 || this._mouseActive) {
      this.startDragEvent(day, month);
    } else {

      const evtsArray: Array<IDayYearViewClicked<any>> = [];

      for (const keyItemValue of Object.keys(this.anualCalendarData.items)) {
        const itemValue: IAnualCalendarMonth<any> = <IAnualCalendarMonth<any>>this.anualCalendarData.items[keyItemValue];

        const evtsAux: IDayYearViewClicked<any> = new class implements IDayYearViewClicked<any> {
          public days: Array<ICalendarDay<any>>;
          public item: string;
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

              evtsAux.item = keyItemValue;
              evtsAux.days = [];
              evtsAux.days.push(daysAux);
              evtsAux.month = month;
              evtsAux.year = this.activeYear;
              evtsArray.push(evtsAux);
            }
          }
        }
      }
      console.log(evtsArray);
      this.evtDayYearViewClicked.emit(evtsArray);
    }

  }

  // methods to star dragging events

  startDragEvent (day: number, month: number): void {
    this._mouseActive = !this._mouseActive;

    if (this._mouseActive) {
      this._startDayDragged = day;
      this._startMonthDragged = month;
      this._daysDragged = [];
      this._daysDraggedByMonth = new class implements IDayYearViewClicked<any> {
        public days: Array<ICalendarDay<any>>;
        public item: string;
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
      this._daysDraggedByMonth.item = 'teste';
      this._daysDraggedByMonth.month = month;
      this._daysDraggedByMonth.year = this.activeYear;
      this._daysDraggedByMonth.days = this._daysDragged;

      this._daysDraggedByYear.push(this._daysDraggedByMonth);

    } else {
      if (this._daysDraggedByYear.length > 0) {
        this.evtDragYearViewClicked.emit(this._daysDraggedByYear);
      } else {
        this._daysDraggedByYear.push(this._daysDraggedByMonth);
        this.evtDragYearViewClicked.emit(this._daysDraggedByYear);
      }
      this._daysDraggedByYear = [];
    }

  }

  draggingTheEvent (day: number, month: number): void {
    if (this._mouseActive) {
      this._daysDraggedByYear = [];

      // verifico que estou com o cursor no mesmo mês em que comecei
      if (month === this._startMonthDragged) {

        // verifico que o dia que tenho seleccionado é superior ou igual ao que seleccionei primeiro
        if (day >= this._startDayDragged) {

          // aqui preencho de novo com os dias desde o primeiro seleccionado até onde tenho o cursor
          this._daysDragged = [];

          for (let d = this._startDayDragged; d <= day; d++) {
            const daysDraggedAux: ICalendarDay<any> = new class implements ICalendarDay<any> {
              public day: number;
              public events: Array<ICalendarEventDay<any>>;
              public isHoliday: boolean;
              public isWeekend: boolean;
            };

            daysDraggedAux.day = d;
            this._daysDragged.push(daysDraggedAux);
          }
        } else {
          // aqui preencho de novo com os dias desde o primeiro seleccionado até onde tenho o cursor
          this._daysDragged = [];

          for (let d = this._startDayDragged; d >= day; d--) {
            const daysDraggedAux: ICalendarDay<any> = new class implements ICalendarDay<any> {
              public day: number;
              public events: Array<ICalendarEventDay<any>>;
              public isHoliday: boolean;
              public isWeekend: boolean;
            };

            daysDraggedAux.day = d;
            this._daysDragged.push(daysDraggedAux);
          }
        }

        // aqui cria um objeto com os dias seleccionados para o mês atual
        this._daysDraggedByMonth = new class implements IDayYearViewClicked<any> {
          public days: Array<ICalendarDay<any>>;
          public item: string;
          public month: ECalendarMonths;
          public year: number;
        };

        this._daysDraggedByMonth.year = this.activeYear;
        this._daysDraggedByMonth.month = month;
        this._daysDraggedByMonth.item = 'teste';
        this._daysDraggedByMonth.days = [];

        for (const days of this._daysDragged) {
          this._daysDraggedByMonth.days.push(days);
        }

        this._daysDraggedByYear.push(this._daysDraggedByMonth);

        // caso o cursor esteja num mês superior ao do primeiro dia seleccionado
      } else if (month > this._startMonthDragged) {
        let firsDay: number = this._startDayDragged;

        // vou percorrer todos os meses até aonde tenho o cursor
        for (let m = this._startMonthDragged; m <= month; m++) {
          let daysOfMonth: number = this.generateDaysOfMonth(m).length;

          if (m === month) {
            daysOfMonth = day;
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
            public item: string;
            public month: ECalendarMonths;
            public year: number;
          };

          this._daysDraggedByMonth.year = this.activeYear;
          this._daysDraggedByMonth.month = m;
          this._daysDraggedByMonth.item = 'teste';
          this._daysDraggedByMonth.days = [];

          for (const days of this._daysDragged) {
            this._daysDraggedByMonth.days.push(days);
          }

          this._daysDraggedByYear.push(this._daysDraggedByMonth);
        }
        // caso o cursor esteja num mês inferior ao inicial
      } else {
        let firsDay: number = this._startDayDragged;

        // vou percorrer todos os meses até aonde tenho o cursor
        for (let m = this._startMonthDragged; m >= month; m--) {
          let dayToStop: number = 1;

          if (m === month) {
            dayToStop = day;
          }

          // aqui preencho de novo com os dias desde o primeiro seleccionado até ao fim do mês ou onde tenha o cursor
          this._daysDragged = [];


          for (let d = firsDay; d >= dayToStop; d--) {
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
          // após a primeira iteração o primeiro dia passa a ser dia 31 (agora estamos a percrrer na ordem inversa - decrementar)
          firsDay = this.generateDaysOfMonth(m - 1).length;

          // aqui cria um objeto com os dias seleccionados para cada mês e adiciona ao array do ano
          this._daysDraggedByMonth = new class implements IDayYearViewClicked<any> {
            public days: Array<ICalendarDay<any>>;
            public item: string;
            public month: ECalendarMonths;
            public year: number;
          };

          this._daysDraggedByMonth.year = this.activeYear;
          this._daysDraggedByMonth.month = m;
          this._daysDraggedByMonth.item = 'teste';
          this._daysDraggedByMonth.days = [];

          for (const days of this._daysDragged) {
            this._daysDraggedByMonth.days.push(days);
          }

          this._daysDraggedByYear.push(this._daysDraggedByMonth);
        }
      }
    }
  }
}


