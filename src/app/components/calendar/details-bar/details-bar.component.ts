import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  ECalendarState,
  ICalendarDataSet,
  ICalendarDataSetLayer,
  ICalendarLabel,
  ICalendarMonthClicked
} from '../calendar.component.interface';

@Component({
  selector: 'app-details-bar',
  templateUrl: './details-bar.component.html',
  styleUrls: ['./details-bar.component.scss']
})
export class DetailsBarComponent implements OnInit {
  @Input() public year: number;
  @Input() public month: number;
  @Input() public panelMode: ECalendarState;
  @Input() public detailsBarLabels: Array<ICalendarLabel>;
  @Input() public dataSets: ICalendarDataSet;
  @Input() public multipleSelect: boolean;
  @Output() public readonly yearChange: EventEmitter<number>;
  @Output() public readonly monthChange: EventEmitter<number>;
  @Output() public readonly evtDateChanged: EventEmitter<ICalendarMonthClicked>;
  @Output() public readonly activeItemChange: EventEmitter<ICalendarDataSet>;

  public activeStatus: boolean;

  private readonly _stringMonths: Array<string>;

  constructor() {
    this.yearChange = new EventEmitter<number>();
    this.monthChange = new EventEmitter<number>();
    this.evtDateChanged = new EventEmitter<ICalendarMonthClicked>();
    this.activeItemChange = new EventEmitter<ICalendarDataSet>();
    this.activeStatus = false;
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
  }

  public ngOnInit(): void {
    this._initDataSets();
    console.log(this.dataSets);
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
    /*if (!this.multipleSelect) {
      if (this.itemsSelection[0] !== this.dataSets[0]) {
        for (let i = 1; i < this.dataSets.length; i++) {
          if (this.itemsSelection[0] === this.dataSets[i]) {
            this.itemsSelection[0] = this.dataSets[i - 1];
            this.activeItemChange.emit(this.itemsSelection);
          }
        }
      }
    }*/
  }

  public incrementItem(): void {
    /*if (!this.multipleSelect) {
      if (this.itemsSelection[0] !== this.dataSets[this.dataSets.length - 1]) {
        for (let i = this.dataSets.length - 2; i >= 0; i--) {
          if (this.itemsSelection[0] === this.dataSets[i]) {
            this.itemsSelection[0] = this.dataSets[i + 1];
            this.activeItemChange.emit(this.itemsSelection);
          }
        }
      }
    }*/
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

  public itemChecked(item: ICalendarDataSetLayer): boolean {
    return false;
    // return this.itemsSelection.indexOf(item) !== -1;
  }

  public itemCheckedChange(item: ICalendarDataSetLayer): void {
    /*if (!this.itemChecked(item)) {
      this.itemsSelection.push(item);
      this.activeItemChange.emit(this.itemsSelection);
    } else {
      const indexToRemove: number = this.itemsSelection.indexOf(item);
      this.itemsSelection.splice(indexToRemove, 1);
      this.activeItemChange.emit(this.itemsSelection);
    }*/
  }

  private _initDataSets(): void {
    const fnTurnOff = (myDataSet: ICalendarDataSet, layerIdx: number = 1) => {
      for (const layer of myDataSet.layers) {
        layer._checked = false;
        layer._layerIdx = layerIdx;
        if (layer.nextDataSet) {
          fnTurnOff(layer.nextDataSet, layerIdx + 1);
        }
      }
    };

    if (this.dataSets) {
      fnTurnOff(this.dataSets);
    } else {
      this.dataSets = {
        title: '',
        layers: undefined
      };
    }
  }
}
