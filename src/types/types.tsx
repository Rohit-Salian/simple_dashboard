export type ActivityMeta = {
  label: string;
  fillColor: string;
};

export type Activity = {
  name: string;
  value: string;
};

export type TotalActivity = {
  name: string;
  value: number;
  fillColor: string;
};

export type DayItem = {
  count: string;
  label: string;
};

export type DayWiseActivity = {
  date: string;
  items: {
    children: DayItem[];
  };
};

export type ActiveDays = {
  days: number;
  isBurnOut: boolean;
  insight: string[];
};

export type AuthorData = {
  name: string;
  totalActivity: Activity[];
  dayWiseActivity: DayWiseActivity[];
  activeDays: ActiveDays;
};

export type FilteredData = {
  mail: string;
  naav: string;
  totalActivity: Activity[];
  dayWiseActivity: DayWiseActivity[];
  activeDays: ActiveDays;
};

export type AuthorWorklog = {
  activityMeta: ActivityMeta[];
  rows: AuthorData[];
};

export type Data = {
  AuthorWorklog: AuthorWorklog;
};
