import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {moment} from '../../../../environments/environment';


@Component({
  selector: 'app-year-view-details',
  templateUrl: './year-view-details.component.html',
  styleUrls: ['./year-view-details.component.scss']
})
export class YearViewDetailsComponent implements OnInit {
  @Input() year: number;
  @Output() yearChange: EventEmitter<number>;

  constructor() {
    this.yearChange = new EventEmitter<number>();
  }

  ngOnInit() {

  }

  generateYearsList(): Array<number> {

    const yearsList: Array<number> = [];
    const actualYear: number = moment().year();

    for (let i = -8; i < 2; i++) {
      yearsList.push(actualYear + i);
    }

    return yearsList;
  }

  changedYear(value: number): void {
    this.year = value;
    this.yearChange.emit(this.year);
  }
}
