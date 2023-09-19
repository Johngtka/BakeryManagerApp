import { Pipe, PipeTransform } from '@angular/core';
import { differenceInDays } from 'date-fns';

@Pipe({
    name: 'salesDate',
})
export class SalesDatePipe implements PipeTransform {
    transform(startDate: number, endDate: number) {
        if (startDate && endDate) {
            return (
                'za ' +
                differenceInDays(new Date(startDate), new Date(endDate)) +
                ' dni'
            );
        } else {
            return '';
        }
    }
}
