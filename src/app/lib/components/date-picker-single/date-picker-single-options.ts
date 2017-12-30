export interface DatePickerSingleOptions {
  startViewportAtChosen: boolean;
  startViewportDate: Date;
  monthLabels: string[];
  dayLabels: string[];
  disableDatesBefore: Date;
  disableDatesAfter: Date;
  closeOnClickOutside: boolean;
  closeOnChangeDay: boolean;
}
