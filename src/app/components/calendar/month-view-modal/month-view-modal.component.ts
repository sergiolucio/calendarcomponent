import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ModalComponent} from '../../../services/modal/modal.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ICalendarDragEvt} from '../calendar.component.interface';

@Component({
  selector: 'app-month-view-modal',
  templateUrl: './month-view-modal.component.html',
  styleUrls: ['./month-view-modal.component.scss']
})
export class MonthViewModalComponent extends ModalComponent implements OnInit {
  @Input() dragEvt: ICalendarDragEvt;
  @Input() teste: string;

  constructor(
    protected readonly _modalInstance: NgbActiveModal,
    protected readonly _changeDetectorRef: ChangeDetectorRef) {
    super(_modalInstance, _changeDetectorRef);
  }

  ngOnInit() {
  }

}
