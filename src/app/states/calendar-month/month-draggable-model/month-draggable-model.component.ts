import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ModalComponent} from '../../../services/modal/modal.component';
import {
  ECalendarDays,
  ECalendarMonths,
  ICalendarEventDay, IMonthlyCalendarDayClicked
} from '../../../components/calendar/calendar.component.interface';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {moment} from '../../../../environments/environment';

@Component({
  selector: 'app-month-draggable-model',
  templateUrl: './month-draggable-model.component.html',
  styleUrls: ['./month-draggable-model.component.scss']
})
export class MonthDraggableModelComponent extends ModalComponent implements OnInit {

  @Input() evtDraggable: IMonthlyCalendarDayClicked<any>;
  private _item: string;
  private _activeMonth: string;
  private _activeYear: number;
  private _startDay: ECalendarDays;
  private _endDay: ECalendarDays;

  constructor(
    protected readonly _modalInstance: NgbActiveModal,
    protected readonly _changeDetectorRef: ChangeDetectorRef) {
    super(_modalInstance, _changeDetectorRef);
  }

  ngOnInit() {
    if (this.evtDraggable) {
      this._startDay = Number(this.evtDraggable.days[0].day);
      this._endDay = Number(this.evtDraggable.days[this.evtDraggable.days.length - 1].day);
      this._activeMonth = ECalendarMonths[this.evtDraggable.month];
      this._activeYear = this.evtDraggable.year;
      this._item = this.evtDraggable.item;
    }
  }

  generateDaysOfMonth(): Array<number> {
    const month: number = Number(ECalendarMonths[this._activeMonth]);
    let stringMonth: string;

    if (month < 10) {
      stringMonth = '0' + month;
    } else {
      stringMonth = String(month);
    }

    const daysAux = moment(stringMonth + '-' + this._activeYear, 'MM-YYYY').daysInMonth();
    let dayAux: Array<number>;
    dayAux = [];

    for (let i = 0; i < daysAux; i++) {
      dayAux.push(i + 1);
    }

    return dayAux;
  }

  generatePriorityLevels(): Array<number> {
    let priorityLvl: Array<number>;
    priorityLvl = [];

    return priorityLvl;
  }
}


