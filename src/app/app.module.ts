import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
    HttpClient,
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    DateAdapter,
    MAT_DATE_FORMATS,
    NativeDateAdapter,
} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { EMMComponent } from './emm/emm.component';
import { UsersService } from './services/users.service';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { UpdatesComponent } from './updates/updates.component';
import { ProductsComponent } from './products/products.component';
import { PricePipe } from './pipes/price.pipe';
import { WeightPipe } from './pipes/weight.pipe';
import { SalesDatePipe } from './pipes/sales-date.pipe';
import { SalesComponent } from './sales/sales.component';
import { UpdateDescPipe } from './pipes/update-desc.pipe';
import { OrdersComponent } from './orders/orders.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SalesInputDialogComponent } from './sales-input-dialog/sales-input-dialog.component';
import { UpdateInputDialogComponent } from './update-input-dialog/update-input-dialog.component';
import { ProductInputDialogComponent } from './product-input-dialog/product-input-dialog.component';
import { EmployersInputDialogComponent } from './employers-input-dialog/employers-input-dialog.component';

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, './assets/i18n/');
}

const navigatorLang = navigator.language.split('-')[0];
const supportedLang = ['pl', 'en'];
const lang = supportedLang.includes(navigatorLang) ? navigatorLang : 'en';
const materialsModules = [
    LayoutModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
];

@NgModule({
    declarations: [
        PricePipe,
        WeightPipe,
        AppComponent,
        EMMComponent,
        SalesDatePipe,
        HomeComponent,
        SalesComponent,
        UpdateDescPipe,
        OrdersComponent,
        UpdatesComponent,
        ProductsComponent,
        EmptyStateComponent,
        ConfirmDialogComponent,
        SalesInputDialogComponent,
        UpdateInputDialogComponent,
        ProductInputDialogComponent,
        EmployersInputDialogComponent,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            defaultLanguage: lang,
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        FormsModule,
        ReactiveFormsModule,
        ...materialsModules,
    ],
    providers: [
        UsersService,
        CdkTextareaAutosize,
        DatePipe,
        provideHttpClient(withInterceptorsFromDi()),
        { provide: DateAdapter, useClass: NativeDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    ],
})
export class AppModule {}
