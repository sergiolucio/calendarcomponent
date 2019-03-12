import {EventEmitter} from '@angular/core';
import {NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

export interface ModalOptions extends NgbModalOptions {
  modalSize?: 'sm' | 'md' | 'lg' | 'xl' | string;
  evtClosed?: EventEmitter<any>;
  evtDismissed?: EventEmitter<any>;
}

export interface IModalComponent {
  closeDisabled: boolean;

  close(result?: any): void;

  dismiss(reason?: any): void;

  beforeDismiss(): boolean | Promise<boolean>;
}
