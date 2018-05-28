export class Filter {
    public level: string;
    public timePeriodString: string;
    public timePeriod: number;

    constructor() {
        this.level = 'Summary';
        this.timePeriodString = 'Last Hour';
        this.timePeriod = 1;
    }

    
}
  