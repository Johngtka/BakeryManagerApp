import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'price',
})
export class PricePipe implements PipeTransform {
    transform(value: string): string {
        const priceProduct = parseInt(value, 10);
        if (priceProduct > 1) {
            return value + 'zł';
        } else if (priceProduct < 1) {
            return value.toString().replace(/^0\./, '') + 'gr';
        } else {
            return '';
        }
    }
}
