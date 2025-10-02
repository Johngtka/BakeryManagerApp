import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'anonymous',
    standalone: false,
})
export class AnonymousPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) return '';
        return '*'.repeat(value.length);
    }
}
