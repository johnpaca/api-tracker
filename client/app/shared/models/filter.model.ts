export enum ReportLevel {
    Summary = 'Summary',
    Detail = 'Detail'
};

export class Filter {
    public level: ReportLevel;
    public timePeriodString: string;
    public timePeriodHours: number;

    constructor() {
        this.level = ReportLevel.Summary;
        this.timePeriodString = 'Last Hour';
        this.timePeriodHours = 1;
    }


}
  