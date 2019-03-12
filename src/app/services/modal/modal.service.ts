import {merge} from 'lodash';
import {Injectable} from '@angular/core';
import {Type} from '@angular/core/src/type';
import {ModalOptions} from './modal.interface';
import {ModalComponent} from './modal.component';
import {isFunction} from '../utils';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

export const CG_MODAL_CLASS = 'cg-modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private readonly _defaultOptions: ModalOptions;

  constructor(
    private _ngbModal: NgbModal
  ) {
    this._defaultOptions = {
      modalSize: 'xl'
    };
  }

  public showVanilla(content: Type<ModalComponent>, options?: ModalOptions): NgbModalRef {
    const properties = merge({}, this._defaultOptions, options);

    const windowClass = properties.windowClass ? properties.windowClass.split(' ') : [];
    windowClass.push(CG_MODAL_CLASS);

    if (properties.modalSize) {
      properties.size = <any>properties.modalSize;
      windowClass.push(`${CG_MODAL_CLASS}-${properties.modalSize}`);
    }

    properties.windowClass = windowClass.join(' ');

    const modalRef = this._ngbModal.open(content, merge(properties, {
      beforeDismiss: () => {
        const instance = <ModalComponent>modalRef.componentInstance;
        return new Promise<boolean>((resolve, reject) => {
          Promise.resolve(instance.beforeDismiss())
            .then((value: boolean) => {
              if (value === false) {
                reject();
                return;
              }
              if (options && isFunction(options.beforeDismiss)) {
                Promise.resolve(options.beforeDismiss())
                  .then((result: boolean) => {
                    result === false ? reject() : instance.closeDisabled
                      ? reject() : resolve();
                  })
                  .catch(() => reject());
              }
              resolve(!instance.closeDisabled);
            })
            .catch(() => reject());
        });
      }
    }));
    modalRef.result
      .then((result: any) => {
        if (properties && properties.evtClosed && isFunction(properties.evtClosed.emit)) {
          properties.evtClosed.emit(result);
        }
      })
      .catch((reason: any) => {
        if (properties && properties.evtDismissed && isFunction(properties.evtDismissed.emit)) {
          properties.evtDismissed.emit(reason);
        }
      });
    return modalRef;
  }

  public show<T = any>(content: Type<ModalComponent>, options?: ModalOptions): Promise<T> {
    return <Promise<T>>this.showVanilla(content, options).result;
  }
}
