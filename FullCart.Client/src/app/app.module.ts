import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { CustomerProductComponent } from './customer-product/customer-product.component';
import { UnAuthorizedComponent } from './un-authorized/un-authorized.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { BrandComponent } from './admin-product/brand/brand.component';
import { NewBrandComponent } from './admin-product/brand/new-brand/new-brand.component';
import { CategoryComponent } from './admin-product/category/category.component';
import { ProductComponent } from './admin-product/product/product.component';
import { NewCategoryComponent } from './admin-product/category/new-category/new-category.component';
import { NewProductComponent } from './admin-product/product/new-product/new-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminProductComponent,
    CustomerProductComponent,
    UnAuthorizedComponent,
    DashBoardComponent,
    BrandComponent,
    NewBrandComponent,
    CategoryComponent,
    ProductComponent,
    NewCategoryComponent,
    NewProductComponent,
    ProductListComponent,
    ShopingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
