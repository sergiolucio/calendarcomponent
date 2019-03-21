import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ModalComponent} from '../../../services/modal/modal.component';
import {
  ECalendarDays,
  ECalendarMonths,
  IMonthlyCalendarDayClicked
} from '../../../components/calendar/calendar.component.interface';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-daily-info-modal',
  templateUrl: './daily-info-modal.component.html',
  styleUrls: ['./daily-info-modal.component.scss']
})
export class DailyInfoModalComponent extends ModalComponent implements OnInit {
  @Input() evtMonthlyCalendarDay: IMonthlyCalendarDayClicked<any>;
  @Input() itemKey: string;
  @Input() activeMonth: ECalendarMonths;
  @Input() activeYear: number;

  constructor(
    protected readonly _modalInstance: NgbActiveModal,
    protected readonly _changeDetectorRef: ChangeDetectorRef) {
    super(_modalInstance, _changeDetectorRef);
  }

  public ngOnInit(): void {
  }
}
