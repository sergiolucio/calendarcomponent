import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {moment} from '../../../../environments/environment';
import {months} from 'moment';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss']
})
export class MonthViewComponent implements OnInit, OnChanges {

  @Input() activeMonth: number;
  @Input() activeYear: number;
  private activeData: string;
  private months: Array<string>;

  constructor() {
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
      this.activeData = stringMonth + '-' + this.activeYear;
    } else {
      this.activeData = this.activeMonth + '-' + this.activeYear;
    }
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
      this.activeData = stringMonth + '-' + this.activeYear;
    } else {
      this.activeData = this.activeMonth + '-' + this.activeYear;
    }
  }



  generateDaysOfMonth(): Array<number> {
    const daysAux = moment(this.activeData, 'MM-YYYY').daysInMonth();
    let dayAux: Array<number>;
    dayAux = [];

    for (let i = 0; i < daysAux; i++) {
      dayAux.push(i + 1);
    }

    return dayAux;
  }

  findCurrentMonth(): string {
    return this.months[this.activeMonth - 1];
  }

  findCurrentDay(day: number): string {
    let dayOfWeek: number;
    if (day < 10) {
      dayOfWeek = moment('0' + day + '-' + this.activeData, 'DD-MM-YYYY').weekday();
    } else {
      dayOfWeek = moment(day + '-' + this.activeData, 'DD-MM-YYYY').weekday();
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

    WeekDay = moment(stringDay + '-' + this.activeData, 'DD-MM-YYYY').weekday();

    if (WeekDay === 5 || WeekDay === 6) {
      return true;
    }

    return false;
  }
}
