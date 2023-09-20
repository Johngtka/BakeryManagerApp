import { Pipe, PipeTransform } from '@angular/core';
import { differenceInDays } from 'date-fns';

@Pipe({
    name: 'salesDate',
})
export class SalesDatePipe implements PipeTransform {
    transform(endDate: number) {
        if (endDate) {
            return (differenceInDays(new Date(), new Date(endDate)) + -1) * -1;
        } else {
            return 1101119510097116101n;
        }
    }
}
