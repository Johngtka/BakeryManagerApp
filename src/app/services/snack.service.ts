import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { TranslateService } from '@ngx-translate/core';

export enum SNACK_TYPE {
    'error',
    'success',
    'info',
}

@Injectable({
    providedIn: 'root',
})
export class SnackService {
    constructor(
        private matSnackbar: MatSnackBar,
        private translateService: TranslateService,
    ) {}

    showSnackBar(i18nKey: string, type: SNACK_TYPE) {
        const action = this.translateService.instant('SNACK_BAR.CLOSE');
        const info = this.translateService.instant(i18nKey);
        this.matSnackbar.open(info, action, {
            duration: 3000,
            panelClass: [
                type === SNACK_TYPE.error
                    ? 'error-snackbar'
                    : type === SNACK_TYPE.info
                    ? 'info-snackbar'
                    : 'success-snackbar',
                'login-snackbar',
            ],
        });
    }
}
