import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthDraggableModelComponent } from './month-draggable-model.component';

describe('MonthDraggableModelComponent', () => {
  let component: MonthDraggableModelComponent;
  let fixture: ComponentFixture<MonthDraggableModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthDraggableModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthDraggableModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
