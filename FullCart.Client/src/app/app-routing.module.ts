import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { UnAuthorizedComponent } from './un-authorized/un-authorized.component';
import { CustomerProductComponent } from './customer-product/customer-product.component';
import { AdminAuthGuard } from './util_services/admin-auth.guard';
import { AuthGuard } from './util_services/auth.guard';
import { BrandComponent } from './admin-product/brand/brand.component';
import { NewBrandComponent } from './admin-product/brand/new-brand/new-brand.component';
import { ProductComponent } from './admin-product/product/product.component';
import { CategoryComponent } from './admin-product/category/category.component';
import { NewCategoryComponent } from './admin-product/category/new-category/new-category.component';
import { NewProductComponent } from './admin-product/product/new-product/new-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { OrderItemsComponent } from './order-items/order-items.component';

const routes : Routes = [
  {path: '', component: LoginComponent},

  {path: 'admin-product', component: AdminProductComponent, canActivate: [AdminAuthGuard]},

  {path: 'brands', component: BrandComponent, canActivate: [AuthGuard]},
  {path: 'brand-add', component: NewBrandComponent, canActivate: [AdminAuthGuard]},
  {path: 'brand-add/:id', component: NewBrandComponent, canActivate: [AdminAuthGuard]},

  {path: 'categories', component: CategoryComponent, canActivate: [AuthGuard]},
  {path: 'category-add', component: NewCategoryComponent, canActivate: [AdminAuthGuard]},
  {path: 'category-add/:id', component: NewCategoryComponent, canActivate: [AdminAuthGuard]},

  {path: 'products', component: ProductComponent, canActivate: [AuthGuard]},
  {path: 'product-add', component: NewProductComponent, canActivate: [AdminAuthGuard]},
  {path: 'product-add/:id', component: NewProductComponent, canActivate: [AdminAuthGuard]},

  {path: 'customer-product', component: CustomerProductComponent, canActivate: [AuthGuard]},

  {path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard]},
  {path: 'shopping-cart', component: ShopingCartComponent, canActivate: [AuthGuard]},

  {path: 'order-items', component: OrderItemsComponent, canActivate: [AuthGuard]},

  {path: 'unauthorized', component: UnAuthorizedComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
