import { TypeAdapterBase } from './type-adapter-base';
import { FiltersUtils } from '../filters-utils';

export interface ListItem {
    value: string;
    label: string;
}

export type ListType = ListItem[];


export class ListAdapter extends TypeAdapterBase<ListType> {

    hasChanges(currentValue: ListType, previousValue: ListType): boolean {

        return FiltersUtils.hasChanges(currentValue, previousValue);
    }
}