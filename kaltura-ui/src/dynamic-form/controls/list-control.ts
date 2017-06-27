import { DynamicFormControlBase, DynamicFormControlArgs } from '../dynamic-form-control-base';

export interface ListControlArgs extends DynamicFormControlArgs<any>
{
    values : {value : any, text : string}[];
}

export class ListControl extends DynamicFormControlBase<string> {
    get controlType()
    {
        return 'List';
    }

    values : {value : any, text : string} [];

    constructor(options: ListControlArgs) {
        super(options);
        this.values = options.values;
    }
}
