import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyInfoYearModalComponent } from './daily-info-year-modal.component';

describe('DailyInfoYearModalComponent', () => {
  let component: DailyInfoYearModalComponent;
  let fixture: ComponentFixture<DailyInfoYearModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyInfoYearModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyInfoYearModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
