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
    if (
      confirm(
        'Are you sure? Do you want to approve : ' + order.orderId.toString()
      )
    ) {
      this._service
        .updateOrder(order.orderId, this.orderStatus.DELIVERED)
        .subscribe({
          next: () => {
            alert('Success! Your request has been delivered.');
            this.getAllOrders();
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {},
        });
    }
  }

  rejectOrder(order: OrderModel) {
    if (
      confirm('Are you sure? Do you want to reject : ' + order.orderId.toString())
    ) {
      this._service
        .updateOrder(order.orderId, this.orderStatus.REJECTED)
        .subscribe({
          next: () => {
            alert('Success! Your request has been rejected.');
            this.getAllOrders();
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {},
        });
    }
  }
}
