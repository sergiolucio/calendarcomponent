import { Component, OnInit } from '@angular/core';
import {moment} from '../../../../environments/environment';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss']
})
export class MonthViewComponent implements OnInit {

  public activeData: string;
  public activeMonth: string;
  public activeYear: string;

  constructor() { }

  ngOnInit() {
    this.activeMonth = '03';
    this.activeYear = '2019';
    this.activeData = this.activeMonth + '-' + this.activeYear;
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

}
