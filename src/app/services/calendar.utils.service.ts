import {cloneDeep} from 'lodash';
import {Injectable} from '@angular/core';
import {
  ECalendarMonths,
  ECalendarWeekDays, EPriority,
  IAnualCalendar,
  ICalendar,
  ICalendarItems
} from '../components/calendar/calendar.component.interface';
import {moment} from '../../environments/environment';
import {findIndex, forEach} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CalendarUtilsService {
  private _anualCalendar: IAnualCalendar<any>;
  private _montlhyCalendar: ICalendar<any>;
  private _monthRequested: number;
  private _yearRequested = 2019;

  constructor() {
  }

  public get anualCalendar(): IAnualCalendar<any> {
    this._generateAnual();
    return cloneDeep(this._anualCalendar);
  }

  public get montlhyCalendar(): ICalendar<any> {
    this._generateMontlhy();
    return cloneDeep(this._montlhyCalendar);
  }


  public get monthRequested(): number {
    return this._monthRequested;
  }

  public set monthRequested(value: number) {
    if (1 <= value && value <= 12) {
      this._monthRequested = value;
    }
  }

  public set yearRequested(value: number) {
    this._yearRequested = value;
  }

  private _generateMontlhy(): void {
    const items: ICalendarItems<any> = {};
    const itemsArray: Array<object> = [];



    for (let i = 1; i <= Math.floor((Math.random() * 20 ) + 1); i++) {
      const daysOff: Array<number> = [];
      const daysArray: Array<object> = [];
      const days: object = {};

      for (let j = 1; j <= Math.floor((Math.random() * 10) + 1); j++) {
        const randomDay: number = Math.floor((Math.random() * this._generateDaysOfMonth()) + 1 );
        const eventsArray: Array<object> = [];

        if (findIndex(daysOff, randomDay) === -1) {
          for (let k = 1; k <= Math.floor((Math.random() * 3) + 1); k++) {
            const eventDesc = 'Evento ' + k;
            const code: number = Math.floor((Math.random() * 4) + 1);
            const color: Array<string> = ['green', 'orange', 'blue', 'gray'];
            const colorOfCode = color[code - 1];
            const event: object = {
              body: undefined,
              type: {
                codigo: code,
                color: colorOfCode,
                descricao: eventDesc,
                prioridade: EPriority[k]
              }
            };
            eventsArray.push(event);
          }

          const daysAux = {
            [randomDay]: {
              day: randomDay,
              isHoliday: false,
              isWeekend: false,
              events: eventsArray
            }

          };
          daysArray.push(daysAux);
          daysOff.push(randomDay);
        }
      }

      forEach(daysArray, value => {
        Object.assign(days, value);
      });

      const itemName: string = 'Empregado ' + i;

      const itemAux = {
        [itemName]: {
          days: days
        }
      };
      itemsArray.push(itemAux);

    }


    forEach(itemsArray,  (value) => {
      Object.assign(items, value);
    });

    this._montlhyCalendar = {
      weekStartDay: ECalendarWeekDays.MONDAY,
      items: items
    };
  }

  private _generateAnual(): void {
    const items: ICalendarItems<any> = {};
    const itemsArray: Array<object> = [];



    for (let i = 1; i <= Math.floor((Math.random() * 20 ) + 1); i++) {
      const daysOff: Array<number> = [];
      const daysArray: Array<object> = [];
      const days: object = {};


      for (let j = 1; j <= Math.floor((Math.random() * 10) + 1); j++) {
        const randomDay: number = Math.floor((Math.random() * this._generateDaysOfMonth()) + 1 );
        const eventsArray: Array<object> = [];

        if (findIndex(daysOff, randomDay) === -1) {

          for (let k = 1; k <= Math.floor((Math.random() * 5) + 1); k++) {
            const eventDesc = 'Evento ' + k;
            const code: number = Math.floor((Math.random() * 4) + 1);
            const color: Array<string> = ['green', 'orange', 'blue', 'gray'];
            const colorOfCode = color[code - 1];
            const event: object = {
              body: 'I\'m the body of the event. I\'m just a string for now but, in the future, I could be an object with multiples keys-values!',
              type: {
                codigo: code,
                color: colorOfCode,
                descricao: eventDesc,
                prioridade: EPriority[k]
              }
            };
            eventsArray.push(event);
          }

          const daysAux: object = {
            [randomDay]: {
              day: randomDay,
              isHoliday: false,
              isWeekend: false,
              events: eventsArray
            }
          };

          daysArray.push(daysAux);
          daysOff.push(randomDay);
        }
      }

      forEach(daysArray,  (value) => {
        Object.assign(days, value);
      });

      const itemName: string = 'Empregado ' + i;

      const itemAux = {
        [itemName]: {
          month: ECalendarMonths[ECalendarMonths[Math.floor(Math.random() * 12 + 1)]],
          days: days
        }
      };
      itemsArray.push(itemAux);

    }


    forEach(itemsArray, (value) => {
      Object.assign(items, value);
    });

    this._anualCalendar = {
      year: this._yearRequested,
      weekStartDay: ECalendarWeekDays.MONDAY,
      items: items
    };
  }

  private _generateDaysOfMonth(): number {
    return moment().month(this._monthRequested - 1).year(this._yearRequested).daysInMonth();
  }
}
