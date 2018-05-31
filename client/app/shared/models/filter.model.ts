export class Filter {
    public level: string;
    public timePeriodString: string;
    public timePeriodHours: number;

    constructor() {
        this.level = 'Summary';
        this.timePeriodString = 'Last Hour';
        this.timePeriodHours = 1;
    }


}
  