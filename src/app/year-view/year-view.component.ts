import { Component, OnInit } from '@angular/core';
import {moment} from '../../environments/environment';



@Component({
  selector: 'app-year-view',
  templateUrl: './year-view.component.html',
  styleUrls: ['./year-view.component.scss']
})



export class YearViewComponent implements OnInit {

  public months: Array<string> = [
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

  constructor() { }

  ngOnInit() {


  }

  generateDaysOfMonth(month: number ): Array<number> {
    const daysAux = moment(month, 'MM' ).daysInMonth();
    let dayAux: Array<number>;
    dayAux = [];

    for (let i = 0 ; i < daysAux; i++) {
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
    moment.updateLocale('en', { week: {
        dow: 1, // First day of week is Monday
        doy: 4  // First week of year must contain 4 January (7 + 1 - 4)
      }});


    for (let i = 0; i < moment('01-' + stringMonth, 'DD-MM').weekday(); i++) {
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

    // Define o primeiro dia da semana como segunda
    moment.updateLocale('en', { week: {
        dow: 1, // First day of week is Monday
        doy: 4  // First week of year must contain 4 January (7 + 1 - 4)
      }});

    WeekDay = moment(stringDay + stringMonth, 'DD-MM').weekday();

    if (WeekDay === 5 || WeekDay === 6) {
      return true;
    }

    return false;
  }

  isCurrentMonth(month: number): boolean {
    if (moment().month() === month) {
      return true;
    }
    return false;
  }

}
