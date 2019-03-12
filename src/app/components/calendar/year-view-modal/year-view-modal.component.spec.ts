import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {YearViewModalComponent} from './year-view-modal.component';

describe('YearViewModalComponent', () => {
  let component: YearViewModalComponent;
  let fixture: ComponentFixture<YearViewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YearViewModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
