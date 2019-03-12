import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {IModalComponent} from './modal.interface';

export class ModalComponent implements IModalComponent {
  public closeDisabled: boolean;

  constructor(
    protected readonly _modalInstance: NgbActiveModal
  ) {
    this.closeDisabled = false;
  }

  public close(result?: any): void {
    this._modalInstance.close(result);
  }

  public dismiss(reason?: any): void {
    this._modalInstance.dismiss(reason);
  }

  public beforeDismiss(): boolean | Promise<boolean> {
    return true;
  }
}
