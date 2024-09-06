import { Routes } from '@angular/router';
import { ListProductComponent } from './product/list-product/list-product.component';
import { AddProductComponent } from './product/add-product/add-product.component';

export const routes: Routes = [
    {path:'',component:ListProductComponent},
    {path:'add-product',component:AddProductComponent},
    {path:'edit-product/:id',component:AddProductComponent},
    {path:'list-product',component:ListProductComponent}
];
