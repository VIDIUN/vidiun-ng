import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'vIsSuggestionDisabled'
})
export class IsSuggestionDisabledPipe implements PipeTransform {
    transform(value: any, arg: string): boolean {
        return  (arg && typeof value[arg] === 'boolean' && value[arg] === false);
    }
}

