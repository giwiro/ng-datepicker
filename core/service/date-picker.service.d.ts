export interface DatePickerLabels {
    months: string[];
    days: string[];
}
export declare type FormatterToDateFunction = (input: any) => Date;
export declare type FormatterFromDateFunction = (d: Date) => any;
export declare class DatePickerService {
    private monthLabels;
    private daysLabels;
    private formatterToDate;
    private formatterFromDate;
    constructor();
    setFormatterToDate(f: string | FormatterToDateFunction): void;
    setFormatterFromDate(f: string | FormatterFromDateFunction): void;
    formatToDate(input: any, auxFormatter?: string | FormatterToDateFunction): Date | any;
    formatFromDate(d: Date, auxFormatter?: string | FormatterFromDateFunction): any;
    setLabels(l: Partial<DatePickerLabels>): void;
    readonly labels: DatePickerLabels;
}
