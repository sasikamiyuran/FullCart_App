import { Component, OnInit } from '@angular/core';
import { ClientAppService } from '../client-app.service';
import { AuthService } from '../util_services/auth.service';
import { OrderModel } from '../Models/order.model';
import { CartStatusEnum } from '../Enum/cart-status.enum';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
})
export class AdminProductComponent implements OnInit {
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
    this.orderList = [];
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

  approveOrder(order: OrderModel) {
    this._service
      .updateOrder(order.orderId, this.orderStatus.DELIVERED)
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

  rejectOrder(order: OrderModel) {
    this._service
      .updateOrder(order.orderId, this.orderStatus.REJECTED)
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
