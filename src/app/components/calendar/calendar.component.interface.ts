export enum ECalendarState {
  Month = 'month',
  Year = 'year'
}

export interface ICalendarItemClicked {
  year: number;
  month: number;
  day?: number;
}
