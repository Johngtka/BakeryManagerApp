import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
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
import { SalesService } from './services/sales.service';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { UpdatesComponent } from './updates/updates.component';
import { UpdateDescPipe } from './pipes/update-desc.pipe';
import { ProductsComponent } from './products/products.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, './assets/i18n/');
}
const navigatorLang = navigator.language.split('-')[0];
const supportedLang = ['pl'];
const lang = supportedLang.includes(navigatorLang) ? navigatorLang : 'pl';
const materialsModules = [
    MatIconModule,
    MatTableModule,
    MatInputModule,
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
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UpdatesComponent,
        UpdateDescPipe,
        ProductsComponent,
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
    providers: [SalesService],
    bootstrap: [AppComponent],
})
export class AppModule {}
