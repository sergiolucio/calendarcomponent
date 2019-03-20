import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ModalComponent} from '../../../services/modal/modal.component';
import {ECalendarMonths, IDayYearViewClicked} from '../../../components/calendar/calendar.component.interface';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {moment} from '../../../../environments/environment';

@Component({
  selector: 'app-year-draggable-modal',
  templateUrl: './year-draggable-modal.component.html',
  styleUrls: ['./year-draggable-modal.component.scss']
})
export class YearDraggableModalComponent extends ModalComponent implements OnInit {
  @Input() evtDragYearViewClicked: Array<IDayYearViewClicked<any>>;
  private _startDay: number;
  private _startMonth: string;
  private _startYear: number;
  private _endDay: number;
  private _endMonth: string;
  private _endYear: number;
  private _months: Array<string>;

  constructor(
    protected readonly _modalInstance: NgbActiveModal,
    protected readonly _changeDetectorRef: ChangeDetectorRef
  ) {
    super(_modalInstance, _changeDetectorRef);
  }

  public ngOnInit() {
    if (this.evtDragYearViewClicked) {
      this._startYear = this.evtDragYearViewClicked[0].year;
      this._endYear = this._startYear;

      const firstMonth: number = this.evtDragYearViewClicked[0].month;
      const lastMonth: number = this.evtDragYearViewClicked[this.evtDragYearViewClicked.length - 1].month;

      if (firstMonth > lastMonth) {
        this.evtDragYearViewClicked.reverse();
      }

      this._startMonth = ECalendarMonths[this.evtDragYearViewClicked[0].month];
      this._endMonth = ECalendarMonths[this.evtDragYearViewClicked[this.evtDragYearViewClicked.length - 1].month];

      for (let i = 0; i < this.evtDragYearViewClicked.length; i++) {
        const firstDay: number = this.evtDragYearViewClicked[i].days[0].day;
        const lastDay: number = this.evtDragYearViewClicked[i].days[this.evtDragYearViewClicked[i].days.length - 1].day;

        if (firstDay > lastDay) {
          this.evtDragYearViewClicked[i].days.reverse();
        }
      }

      this._startDay = this.evtDragYearViewClicked[0].days[0].day;

      const lastIndex: number = this.evtDragYearViewClicked.length - 1;
      this._endDay = this.evtDragYearViewClicked[lastIndex].days[this.evtDragYearViewClicked[lastIndex].days.length - 1].day;
    }

    this._months = [];
    for (let i = 1; i <= 12; i++) {
      this._months.push(ECalendarMonths[i]);
    }
  }

  generateDaysOfMonth(month: string, year: number): Array<number> {
    const m = ECalendarMonths[month];

    const daysAux = moment(m + '-' + year, 'MM-YYYY').daysInMonth();
    let dayAux: Array<number>;
    dayAux = [];

    for (let i = 0; i < daysAux; i++) {
      dayAux.push(i + 1);
    }

    return dayAux;
  }
}
