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
  selector: 'app-month-draggable-modal',
  templateUrl: './month-draggable-modal.component.html',
  styleUrls: ['./month-draggable-modal.component.scss']
})
export class MonthDraggableModalComponent extends ModalComponent implements OnInit {

  @Input() evtDraggable: IMonthlyCalendarDayClicked<any>;
  public item: string;
  public activeMonth: string;
  public activeYear: number;
  public startDay: ECalendarDays;
  public endDay: ECalendarDays;

  constructor(
    protected readonly _modalInstance: NgbActiveModal,
    protected readonly _changeDetectorRef: ChangeDetectorRef) {
    super(_modalInstance, _changeDetectorRef);
  }

  ngOnInit() {
    if (this.evtDraggable) {
      this.startDay = Number(this.evtDraggable.days[0].day);
      this.endDay = Number(this.evtDraggable.days[this.evtDraggable.days.length - 1].day);
      this.activeMonth = ECalendarMonths[this.evtDraggable.month];
      this.activeYear = this.evtDraggable.year;
      this.item = this.evtDraggable.item;
    }
  }

  public generateDaysOfMonth(): Array<number> {
    const month: number = Number(ECalendarMonths[this.activeMonth]);
    let stringMonth: string;

    if (month < 10) {
      stringMonth = '0' + month;
    } else {
      stringMonth = String(month);
    }

    const daysAux = moment(stringMonth + '-' + this.activeYear, 'MM-YYYY').daysInMonth();
    let dayAux: Array<number>;
    dayAux = [];

    for (let i = 0; i < daysAux; i++) {
      dayAux.push(i + 1);
    }

    return dayAux;
  }
}


