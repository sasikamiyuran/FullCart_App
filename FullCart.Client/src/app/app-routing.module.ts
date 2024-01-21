import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AuthGuard } from './util_services/auth.guard';
import { UnAuthorizedComponent } from './un-authorized/un-authorized.component';
import { CustomerProductComponent } from './customer-product/customer-product.component';

const routes : Routes = [
  {path: '', component: LoginComponent},
  {path: 'admin-product', component: AdminProductComponent, canActivate: [AuthGuard]},
  {path: 'customer-product', component: CustomerProductComponent, canActivate: [AuthGuard]},
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
