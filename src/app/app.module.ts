import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
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
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SalesInputDialogComponent } from './sales-input-dialog/sales-input-dialog.component';
import { UpdateInputDialogComponent } from './update-input-dialog/update-input-dialog.component';
import { ProductInputDialogComponent } from './product-input-dialog/product-input-dialog.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, './assets/i18n/');
}
const navigatorLang = navigator.language.split('-')[0];
const supportedLang = ['pl', 'en'];
const lang = supportedLang.includes(navigatorLang) ? navigatorLang : 'en';
const materialsModules = [
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    LayoutModule,
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UpdatesComponent,
        ProductsComponent,
        PricePipe,
        WeightPipe,
        UpdateDescPipe,
        ConfirmDialogComponent,
        UpdateInputDialogComponent,
        ProductInputDialogComponent,
        SalesComponent,
        SalesDatePipe,
        SalesInputDialogComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
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
    providers: [UsersService, CdkTextareaAutosize],
    bootstrap: [AppComponent],
})
export class AppModule {}
