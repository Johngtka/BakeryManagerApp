import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'anonymous',
})
export class AnonymousPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) return '';
        return '*'.repeat(value.length);
    }
}
