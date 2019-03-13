import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ModalComponent} from '../../../services/modal/modal.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-year-view-modal',
  templateUrl: './year-view-modal.component.html',
  styleUrls: ['./year-view-modal.component.scss']
})
export class YearViewModalComponent extends ModalComponent implements OnInit {
  @Input() name: string;

  constructor(
    protected readonly _modalInstance: NgbActiveModal,
    protected readonly _changeDetectorRef: ChangeDetectorRef
  ) {
    super(_modalInstance, _changeDetectorRef);
  }

  public ngOnInit() {
  }
}
