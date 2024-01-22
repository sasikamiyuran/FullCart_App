import { Component, OnInit } from '@angular/core';
import { ClientAppService } from '../client-app.service';
import { AuthService } from '../util_services/auth.service';
import { OrderModel } from '../Models/order.model';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  orderList: OrderModel[];

  constructor(private _service: ClientAppService,
    private _authService: AuthService){this.orderList = [];}

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

  approveOrder(order: OrderModel){}

  rejectOrder(order: OrderModel){}
}
