import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {moment} from '../../../../environments/environment';
import {ICalendarMonthClicked} from '../calendar.component.interface';


@Component({
  selector: 'app-details-bar',
  templateUrl: './details-bar.component.html',
  styleUrls: ['./details-bar.component.scss']
})
export class DetailsBarComponent implements OnInit {
  @Input() year: number;
  @Output() yearChange: EventEmitter<number>;
  @Input() month: number;
  @Output() monthChange: EventEmitter<number>;
  @Input() monthSelectorDisabled: boolean;
  @Output() evtDateChanged: EventEmitter<ICalendarMonthClicked>;
  public  stringMonths: Array<string>;

  constructor() {
    this.yearChange = new EventEmitter<number>();
    this.monthChange = new EventEmitter<number>();
    this.evtDateChanged = new EventEmitter<ICalendarMonthClicked>();
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
    this.dateChanged();
  }

  incrementYear(): void {
    this.year++;
    this.yearChange.emit(this.year);
    this.dateChanged();
  }

  decrementMonth(): void {
    if (!this.monthSelectorDisabled && this.month > 1) {
      this.month--;
      this.monthChange.emit(this.month);
      this.dateChanged();
    }
  }

  incrementMonth(): void {
    if (!this.monthSelectorDisabled && this.month < 12) {
      this.month++;
      this.monthChange.emit(this.month);
      this.dateChanged();
    }
  }

  getMonthName(): string {
    return this.stringMonths[this.month - 1];
  }

  dateChanged() {
    this.evtDateChanged.emit({
      year: this.year,
      month: this.month
    });
  }

}
