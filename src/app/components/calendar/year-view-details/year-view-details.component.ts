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
  @Input() month: number;
  @Output() monthChange: EventEmitter<number>;
  @Input() monthSelectorDisabled: boolean;
  public  stringMonths: Array<string>;

  constructor() {
    this.yearChange = new EventEmitter<number>();
    this.monthChange = new EventEmitter<number>();
  }

  ngOnInit() {
    this.stringMonths = [
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

  decrementYear(): void {
    this.year--;
    this.yearChange.emit(this.year);
  }

  incrementYear(): void {
    this.year++;
    this.yearChange.emit(this.year);
  }

  decrementMonth(): void {
    if (!this.monthSelectorDisabled && this.month > 1) {
      this.month--;
      this.monthChange.emit(this.month);
    }
  }

  incrementMonth(): void {
    if (!this.monthSelectorDisabled && this.month < 12) {
      this.month++;
      this.monthChange.emit(this.month);
    }
  }

  getMonthName(): string {
    return this.stringMonths[this.month - 1];
  }
}
