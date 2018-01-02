import { AbstractCalendarOptions } from '../abstract-calendar/abstract-calendar-options';
export interface SingleCalendarOptions extends AbstractCalendarOptions {
    noChoose: boolean;
    startChosenToday: boolean;
    startViewportAtChosen: boolean;
}
