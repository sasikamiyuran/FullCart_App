import { Component, OnInit } from '@angular/core';
import { OrderItemProductModel } from '../Models/order-item-product.model';
import { ClientAppService } from '../client-app.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../util_services/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css'],
})
export class OrderItemsComponent implements OnInit {
  orderItemProducts: OrderItemProductModel[];

  constructor(
    private _service: ClientAppService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _location: Location
  ) {
    this.orderItemProducts = [];
  }

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      let role = this._authService.getUserRoles();
      this._service.setLoggedInUserRole(role);
    }
    
    let orderId = this._route.snapshot.paramMap.get('orderId');
    if (orderId != null && orderId != undefined) {
      this.getOrderItemProductsByOrderId(+orderId);
    }
  }

  getOrderItemProductsByOrderId(orderId: number) {
    if (orderId < 0) {
      return;
    }

    this._service.getOrderItemProductByOrderId(orderId).subscribe({
      next: (data) => {
        console.log(data);
        this.orderItemProducts = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  goBack(){
    this._location.back();
  }
}
