import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyInfoModalComponent } from './daily-info-modal.component';

describe('DailyInfoModalComponent', () => {
  let component: DailyInfoModalComponent;
  let fixture: ComponentFixture<DailyInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
