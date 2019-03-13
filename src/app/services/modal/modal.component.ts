import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {IModalComponent} from './modal.interface';
import {AfterViewInit, ChangeDetectorRef} from '@angular/core';

export class ModalComponent implements AfterViewInit, IModalComponent {
  public closeDisabled: boolean;

  constructor(
    protected readonly _modalInstance: NgbActiveModal,
    protected readonly _changeDetectorRef: ChangeDetectorRef
  ) {
    this.closeDisabled = false;
  }

  public ngAfterViewInit(): void {
    this._changeDetectorRef.detectChanges();
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
