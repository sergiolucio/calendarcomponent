import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ECalendarState, ICalendar, ICalendarLabels, ICalendarMonthClicked} from '../calendar.component.interface';


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
  @Output() evtDateChanged: EventEmitter<ICalendarMonthClicked>;
  @Input() itemsAvailables: Array<string>;
  @Input() activeItem: string;
  @Output() activeItemChange: EventEmitter<string>;
  private _stringMonths: Array<string>;
  @Input() panelMode: ECalendarState;
  @Input() detailsBarLabels: ICalendarLabels;

  constructor() {
    this.yearChange = new EventEmitter<number>();
    this.monthChange = new EventEmitter<number>();
    this.evtDateChanged = new EventEmitter<ICalendarMonthClicked>();
    this.activeItemChange = new EventEmitter<string>();
  }

  public ngOnInit(): void {
    this._stringMonths = [
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

    // this.activeItem = this.itemsAvailables[0];
  }

  public decrementYear(): void {
    this.year--;
    this.yearChange.emit(this.year);
    this._dateChanged();
  }

  public incrementYear(): void {
    this.year++;
    this.yearChange.emit(this.year);
    this._dateChanged();
  }

  public decrementMonth(): void {
    if (this.month > 1) {
      this.month--;
      this.monthChange.emit(this.month);
      this._dateChanged();
    }
  }

  public incrementMonth(): void {
    if (this.month < 12) {
      this.month++;
      this.monthChange.emit(this.month);
      this._dateChanged();
    }
  }

  public getMonthName(): string {
    return this._stringMonths[this.month - 1];
  }

  public decrementItem(): void {
    if (this.activeItem !== this.itemsAvailables[0]) {
      for (let i = 1; i < this.itemsAvailables.length; i++) {
        if (this.activeItem === this.itemsAvailables[i]) {
          this.activeItem = this.itemsAvailables[i - 1];
          this.activeItemChange.emit(this.activeItem);
        }
      }
    }
  }

  public incrementItem(): void {
    if (this.activeItem !== this.itemsAvailables[this.itemsAvailables.length - 1]) {
      for (let i = this.itemsAvailables.length - 2; i >= 0; i--) {
        if (this.activeItem === this.itemsAvailables[i]) {
          this.activeItem = this.itemsAvailables[i + 1];
          this.activeItemChange.emit(this.activeItem);
        }
      }
    }
  }

  private _dateChanged() {
    this.evtDateChanged.emit({
      year: this.year,
      month: this.month
    });
  }

  public teste(): void {
    alert('tap');
  }

}
