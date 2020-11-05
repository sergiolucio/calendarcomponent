import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {moment} from '../../../environments/environment';
import {CalendarUtilsService} from '../../services/calendar.utils.service';
import {
  IAnualCalendar, ICalendarDataSet,
  ICalendarLabel,
  ICalendarMonthClicked,
  IDayYearViewClicked
} from '../../components/calendar/calendar.component.interface';
import {ModalService} from '../../services/modal/modal.service';
import {DailyInfoYearModalComponent} from './daily-info-year-modal/daily-info-year-modal.component';
import {YearDraggableModalComponent} from './year-draggable-modal/year-draggable-modal.component';

@Component({
  selector: 'app-calendar-month-state',
  templateUrl: './calendar.year.state.component.html'
})
export class CalendarYearStateComponent implements OnInit {

  public activeYear: number;
  public anualCalendarData: IAnualCalendar<any>;
  public detailsBarLabels: Array<ICalendarLabel>;
  public dataSets: ICalendarDataSet;
  public evtDayYearViewClicked: Array<IDayYearViewClicked<any>>;
  public evtDragYearViewClicked: Array<IDayYearViewClicked<any>>;
  public multipleSelect = true;

  constructor(
    private readonly _router: Router,
    private readonly _calendarUtilsService: CalendarUtilsService,
    private readonly _modalService: ModalService
  ) {
  }

  public ngOnInit(): void {
    if (!this.activeYear) {
      this.activeYear = moment().year();
    }

    this.anualCalendarData = this._calendarUtilsService.anualCalendar;
    this.detailsBarLabels = this._calendarUtilsService.labelsAvailables;
    this.dataSets = this._calendarUtilsService.dataSets;

    // this._calendarUtilsService.yearRequested = this.activeYear;
    // this.anualCalendarData = this._calendarUtilsService.anualCalendar;
    // this.detailsBarLabels = this._calendarUtilsService.labelsAvailables;
    // this.multipleSelect = true;
  }

  public yearClicked(year: number, month: number): void {
    this._router.navigateByUrl(`/month-view/${year}/${month}`);
  }

  public dateChanged(value: ICalendarMonthClicked): void {

    this.anualCalendarData = this._calendarUtilsService.anualCalendar;
    this.detailsBarLabels = this._calendarUtilsService.labelsAvailables;

    // this.activeYear = value.year;
    // this._calendarUtilsService.yearRequested = this.activeYear;
    // this.anualCalendarData = this._calendarUtilsService.anualCalendar;
  }

  public dayYearViewClicked(value: Array<IDayYearViewClicked<any>>): void {
    this.evtDayYearViewClicked = value;

    const instance = this._modalService.showVanilla(DailyInfoYearModalComponent, {
      modalSize: 'lg'
    });
    instance.componentInstance.evtDayYearViewClicked = value;
  }

  public dragYearViewClicked(value: Array<IDayYearViewClicked<any>>): void {
    this.evtDragYearViewClicked = value;

    const instance = this._modalService.showVanilla(YearDraggableModalComponent, {
      modalSize: 'lg'
    });
    instance.componentInstance.evtDragYearViewClicked = value;
  }

}
