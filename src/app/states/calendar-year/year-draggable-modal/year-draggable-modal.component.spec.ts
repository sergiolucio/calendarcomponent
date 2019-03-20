import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearDraggableModalComponent } from './year-draggable-modal.component';

describe('YearDraggableModalComponent', () => {
  let component: YearDraggableModalComponent;
  let fixture: ComponentFixture<YearDraggableModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearDraggableModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearDraggableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
