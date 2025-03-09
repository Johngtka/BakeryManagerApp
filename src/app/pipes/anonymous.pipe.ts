import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'anonymous',
})
export class AnonymousPipe implements PipeTransform {
    private specialChars = '!@#$%^&*()_+{}[]:;<>,.?/~`|';

    transform(value: string, length?: number): string {
        if (!value) return '';
        const resultLength = length ?? value.length;
        let result = '';
        for (let i = 0; i < resultLength; i++) {
            result += this.specialChars.charAt(
                Math.floor(Math.random() * this.specialChars.length),
            );
        }
        return result;
    }
}
