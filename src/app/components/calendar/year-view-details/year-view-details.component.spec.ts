import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {YearViewDetailsComponent} from './year-view-details.component';

describe('YearViewDetailsComponent', () => {
  let component: YearViewDetailsComponent;
  let fixture: ComponentFixture<YearViewDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YearViewDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
