export interface CurrentMonthStatsData {
  total: { value: number; change: string };
  experience: { value: number; change: string };
  usage: { value: number; change: string };
  dailyAverage: { value: number; change: string };
}

export interface MonthlyPassStatsData {
  month: string;
  dayExperience: number;
  dayUse: number;
}
