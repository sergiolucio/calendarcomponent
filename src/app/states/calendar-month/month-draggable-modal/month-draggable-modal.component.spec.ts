import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthDraggableModalComponent } from './month-draggable-modal.component';

describe('MonthDraggableModalComponent', () => {
  let component: MonthDraggableModalComponent;
  let fixture: ComponentFixture<MonthDraggableModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthDraggableModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthDraggableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
