import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ECalendarState, ICalendar, ICalendarLabels, ICalendarMonthClicked} from '../calendar.component.interface';
import {findIndex, indexOf} from 'lodash';

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
  @Output() activeItemChange: EventEmitter<Array<string>>;
  private _stringMonths: Array<string>;
  @Input() panelMode: ECalendarState;
  @Input() detailsBarLabels: ICalendarLabels;
  public activeStatus: boolean;
  @Input() multipleSelect: boolean;
  public itemsSelection: Array<string>;

  constructor() {
    this.yearChange = new EventEmitter<number>();
    this.monthChange = new EventEmitter<number>();
    this.evtDateChanged = new EventEmitter<ICalendarMonthClicked>();
    this.activeItemChange = new EventEmitter<Array<string>>();
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

    this.activeStatus = false;

    this.itemsSelection = [];
    if (this.itemsAvailables) {
      this.itemsSelection.push(this.itemsAvailables[0]);
    }
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

  public decrementItem(): void {
    if (!this.multipleSelect) {
      if (this.itemsSelection[0] !== this.itemsAvailables[0]) {
        for (let i = 1; i < this.itemsAvailables.length; i++) {
          if (this.itemsSelection[0] === this.itemsAvailables[i]) {
            this.itemsSelection[0] = this.itemsAvailables[i - 1];
            this.activeItemChange.emit(this.itemsSelection);
          }
        }
      }
    }
  }

  public incrementItem(): void {
    if (!this.multipleSelect) {
      if (this.itemsSelection[0] !== this.itemsAvailables[this.itemsAvailables.length - 1]) {
        for (let i = this.itemsAvailables.length - 2; i >= 0; i--) {
          if (this.itemsSelection[0] === this.itemsAvailables[i]) {
            this.itemsSelection[0] = this.itemsAvailables[i + 1];
            this.activeItemChange.emit(this.itemsSelection);
          }
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

  public toggleActive(): void {
    this.activeStatus = !this.activeStatus;
  }

  public itemChecked(item: string): boolean {

    if (indexOf(this.itemsSelection, item) !== -1) {
      return true;
    }

    return false;
  }

  public itemCheckedChange(item: string): void {
    if (!this.itemChecked(item)) {
      this.itemsSelection.push(item);
      this.activeItemChange.emit(this.itemsSelection);
    } else {
      const indexToRemove: number = indexOf(this.itemsSelection, item);
      this.itemsSelection.splice(indexToRemove, 1);
      this.activeItemChange.emit(this.itemsSelection);
    }
  }
}
