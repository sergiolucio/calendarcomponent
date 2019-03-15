export enum ECalendarState {
  Month = 'month',
  Year = 'year'
}

export interface ICalendarItemClicked {
  year: number;
  month: number;
  day?: number;
}


// -------------------------------------


// Generic calendar
export enum ECalendarMonths {
  JANUARY = 1,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER
}

export enum ECalendarWeekDays {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}

export enum ECalendarDays {
  '01' = 1,
  '03',
  '02',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '010',
  '011',
  '012',
  '013',
  '014',
  '015',
  '016',
  '017',
  '018',
  '019',
  '020',
  '021',
  '022',
  '023',
  '024',
  '025',
  '026',
  '027',
  '028',
  '029',
  '030',
  '031'
}

export interface ICalendar<T> {
  items: ICalendarItems<T>;
  weekStartDay: ECalendarWeekDays;
}

export interface ICalendarItems<T> {
  [id: string]: ICalendarItem<T>;
}

export interface ICalendarItem<T> {
  days: ICalendarDays<T>;
}

export type ICalendarDays<T> = {
  [day in ECalendarDays]?: ICalendarDay<T>;
};

export interface ICalendarDay<T> {
  day: number;
  isWeekend: boolean;
  isHoliday: boolean;
  events?: Array<ICalendarEventDay<T>>;
}

export interface ICalendarEventDay<T> {
  body?: T;
  type: ICalendarEventDayType;
}

export interface ICalendarEventDayType {
  codigo: number;
  descricao: string;
  color: string;
}


// Anual calendar

export interface IAnualCalendar<T> extends ICalendar<T> {
  year: number;
  items: IAnualCalendarMonths<T>;
}

export type IAnualCalendarMonths<T> = ICalendarItems<T> & {
  [month in ECalendarMonths]?: IAnualCalendarMonth<T>;
};

export interface IAnualCalendarMonth<T> extends ICalendarItem<T> {
  month: ECalendarMonths;
}
