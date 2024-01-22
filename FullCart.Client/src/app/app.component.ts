import { Component, OnInit } from '@angular/core';
import { AuthService } from './util_services/auth.service';
import { Router } from '@angular/router';
import { UserRoleEnum } from './Enum/user-role.enum';
import { ClientAppService } from './client-app.service';
import { CartService } from './util_services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'FullCart.Client';
  loggedInUserRole: string = '';
  cartCount: number;
  isOpen: boolean ;

  constructor(
    private _service: ClientAppService,
    private _authService: AuthService,
    private _cartService: CartService,
    private _router: Router
  ) {
    this.cartCount = 0;
    this.isOpen = false;
  }

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      let role = this._authService.getUserRoles();
      this._service.setLoggedInUserRole(role);
    }
    this._cartService.cartUpdates$.subscribe(() => {
      this.cartCount = this._cartService.count;
    });

    this.checkUserRole();
  }

  checkUserRole() {
    this._service.getLoggedInUserRole().subscribe((userRole) => {
      this.loggedInUserRole = userRole;
    });
  }

  signOut() {
    if (this._authService.logOut()) {
      this._service.setLoggedInUserRole('');
      this._router.navigate(['']);
    } else {
      alert('Somethig went wrong');
    }
  }

  goToCart(){
    this._router.navigate(['/shopping-cart']);
  }
}
