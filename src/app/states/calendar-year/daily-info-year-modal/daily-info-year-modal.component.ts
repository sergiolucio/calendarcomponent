import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ModalComponent} from '../../../services/modal/modal.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {IDayYearViewClicked} from '../../../components/calendar/calendar.component.interface';

@Component({
  selector: 'app-daily-info-year-modal',
  templateUrl: './daily-info-year-modal.component.html',
  styleUrls: ['./daily-info-year-modal.component.scss']
})
export class DailyInfoYearModalComponent extends ModalComponent implements OnInit {
  @Input() evtDayYearViewClicked: Array<IDayYearViewClicked<any>>;

  constructor(
    protected readonly _modalInstance: NgbActiveModal,
    protected readonly _changeDetectorRef: ChangeDetectorRef
  ) {
    super(_modalInstance, _changeDetectorRef);
  }

  public ngOnInit() {
  }
}
