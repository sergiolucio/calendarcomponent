import { cloneDeep } from 'lodash';
import { Injectable } from '@angular/core';
import {
  ECalendarWeekDays,
  IAnualCalendar,
  IAnualCalendarMonths,
  ICalendar,
  ICalendarDataSet,
  ICalendarDataSetLayer,
  ICalendarLabel,
  EPriority,
  ECalendarMonths,
  ICalendarItems
} from '../components/calendar/calendar.component.interface';
import { moment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarUtilsService {
  private _monthRequested: number;
  private _yearRequested = 2019;
  private _labelsAvailables: Array<ICalendarLabel>;
  private _dataSets: ICalendarDataSet;
  private _anualCalendar: IAnualCalendar<any>;
  private _montlhyCalendar: ICalendar<any>;

  constructor() {
  }

  public get labelsAvailables(): Array<ICalendarLabel> {
    this._generateLabels();
    return cloneDeep(this._labelsAvailables);
  }

  public get dataSets(): ICalendarDataSet {
    this._generateDataSets();
    return cloneDeep(this._dataSets);
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

  private _generateDaysOfMonth(): number {
    return moment().month(this._monthRequested - 1).year(this._yearRequested).daysInMonth();
  }

  private _generateLabels(): void {
    this._labelsAvailables = [];

    const colors: Array<string> = ['#f2a654', '#46be8a', '#57c7d4', '#8daaba'];
    const labels: Array<string> = ['Pendente', 'Aprovado', 'Feriado', 'Rejeitado'];

    for (let i = 0; i < colors.length; i++) {
      const labelAux: ICalendarLabel = new class implements ICalendarLabel {
        public color: string;
        public label: string;
        public quantity: number;
      };
      labelAux.color = colors[i];
      labelAux.label = labels[i];
      labelAux.quantity = Math.floor(Math.random() * 30);
      this._labelsAvailables.push(labelAux);
    }
  }

  private _generateDataSets(): void {
    this._dataSets = {
      title: 'Serviços',
      layers: []
    };

    for (let j = 1; j < (Math.random() * 10) + 3; j++) {
      const empregadosLayer: Array<ICalendarDataSetLayer> = [];
      for (let i = 1; i < (Math.random() * 10) + 5; i++) {
        empregadosLayer.push({title: `Empregado ${i}`});
      }
      this._dataSets.layers.push({title: `Serviço ${j}`, nextDataSet: {title: 'Empregados', layers: empregadosLayer}});
    }
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

        if (daysOff.indexOf(randomDay) === -1) {
          for (let k = 1; k <= Math.floor((Math.random() * 3) + 1); k++) {
            const eventDesc = 'Evento ' + k;
            const code: number = Math.floor((Math.random() * 4) + 1);
            const color: Array<string> = ['#f2a654', '#57c7d4', '#8daaba', '#46be8a'];
            const event: object = {
              body: 'I\'m the body of the event. I\'m just a string for now but, in the future, I could be an object with multiples keys-values!',
              type: {
                codigo: code,
                color: color[Math.floor(Math.random() * 3 + 1)],
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

      daysArray.forEach(value => Object.assign(days, value));

      const itemName: string = 'Empregado ' + i;

      const itemAux = {
        [itemName]: {
          days: days
        }
      };
      itemsArray.push(itemAux);

    }

    itemsArray.forEach(value => Object.assign(items, value));

    this._montlhyCalendar = {
      weekStartDay: ECalendarWeekDays.MONDAY,
      items: items
    };
  }
  
  private _generateAnual(): void {
    const items: IAnualCalendarMonths<any> = {};
    const itemsArray: Array<object> = [];



    for (let i = 1; i <= Math.floor((Math.random() * 20 ) + 1); i++) {
      const daysOff: Array<number> = [];
      const daysArray: Array<object> = [];
      const days: object = {};


      for (let j = 1; j <= Math.floor((Math.random() * 10) + 1); j++) {
        const randomDay: number = Math.floor((Math.random() * this._generateDaysOfMonth()) + 1 );
        const eventsArray: Array<object> = [];

        if (daysOff.indexOf(randomDay) === -1) {

          for (let k = 1; k <= Math.floor((Math.random() * 5) + 1); k++) {
            const eventDesc = 'Evento ' + k;
            const code: number = Math.floor((Math.random() * 4) + 1);
            const color: Array<string> = ['#f2a654', '#57c7d4', '#8daaba', '#46be8a'];
            const event: object = {
              body: 'I\'m the body of the event. I\'m just a string for now but, in the future, I could be an object with multiples keys-values!',
              type: {
                codigo: code,
                color: color[Math.floor(Math.random() * 3 + 1)],
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

      daysArray.forEach((value) => Object.assign(days, value));

      const itemName: string = 'Empregado ' + i;

      const itemAux = {
        [itemName]: {
          month: ECalendarMonths[ECalendarMonths[Math.floor(Math.random() * 12 + 1)]],
          days: days
        }
      };
      itemsArray.push(itemAux);

    }

    itemsArray.forEach(value => Object.assign(items, value));

    this._anualCalendar = {
      year: this._yearRequested,
      weekStartDay: ECalendarWeekDays.MONDAY,
      items: items
    };
  }
}
