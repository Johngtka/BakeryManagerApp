import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SalesComponent } from './sales/sales.component';
import { UpdatesComponent } from './updates/updates.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'updates',
        component: UpdatesComponent,
    },
    {
        path: 'products',
        component: ProductsComponent,
    },
    {
        path: 'sales',
        component: SalesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
