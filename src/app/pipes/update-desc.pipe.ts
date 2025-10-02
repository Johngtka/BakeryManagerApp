import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'updateDesc',
    standalone: false,
})
export class UpdateDescPipe implements PipeTransform {
    transform(value: string, htmlTag: string): string {
        if (!value || !htmlTag) {
            return value;
        }
        const tagRegExp = new RegExp(`<\\/${htmlTag}\\s*>`, 'gi');
        return value.replace(tagRegExp, '');
    }
}
