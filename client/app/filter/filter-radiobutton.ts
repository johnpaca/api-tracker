import { FilterBase } from './filter-base';

export class RadioButtonFilter extends FilterBase<string> {
  controlType = 'radio';
  options: {key: string, value: string}[] = [];
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
    this.type = 'radio';
  }
}