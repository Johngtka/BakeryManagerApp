import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'weight',
})
export class WeightPipe implements PipeTransform {
    transform(value: string): string {
        const weight = parseInt(value, 10);
        const mass = weight.toString().replace(/0/g, '');
        if (weight >= 1000) {
            return mass + 'kg';
        } else if (weight <= 150) {
            return value + 'g';
        } else {
            return '';
        }
    }
}
