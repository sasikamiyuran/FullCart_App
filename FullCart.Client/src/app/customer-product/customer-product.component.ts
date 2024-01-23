import { Component, OnInit } from '@angular/core';
import { ClientAppService } from '../client-app.service';
import { AuthService } from '../util_services/auth.service';
import { OrderModel } from '../Models/order.model';
import { CartStatusEnum } from '../Enum/cart-status.enum';

@Component({
  selector: 'app-customer-product',
  templateUrl: './customer-product.component.html',
  styleUrls: ['./customer-product.component.css'],
})
export class CustomerProductComponent implements OnInit {
  orderList: OrderModel[];
  orderStatus = CartStatusEnum;

  constructor(
    private _service: ClientAppService,
    private _authService: AuthService
  ) {
    this.orderList = [];
  }

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      let role = this._authService.getUserRoles();
      this._service.setLoggedInUserRole(role);
    }
    this.getAllOrders();
  }

  getAllOrders() {
    this._service.getOrders().subscribe({
      next: (data) => {
        this.orderList = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  cancelOrder(orderId: number){
    this._service
      .updateOrder(orderId, this.orderStatus.CANCELED)
      .subscribe({
        next: () => {
          this.getAllOrders();
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
  }
}
