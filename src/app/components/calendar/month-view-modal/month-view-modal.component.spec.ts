import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthViewModalComponent } from './month-view-modal.component';

describe('MonthViewModalComponent', () => {
  let component: MonthViewModalComponent;
  let fixture: ComponentFixture<MonthViewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthViewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
