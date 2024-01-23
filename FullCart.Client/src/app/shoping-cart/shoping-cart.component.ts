import { Component, OnInit } from '@angular/core';
import { CartService } from '../util_services/cart.service';
import { CartProductModel } from '../Models/cart-product.model';
import { AuthService } from '../util_services/auth.service';
import { ClientAppService } from '../client-app.service';
import { Router } from '@angular/router';
import { ProductModel } from '../Models/product.model';
import { OrderItemModel } from '../Models/order-item.model';
import { OrderModel } from '../Models/order.model';
import { CartStatusEnum } from '../Enum/cart-status.enum';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css'],
})
export class ShopingCartComponent implements OnInit {
  cartProductList: CartProductModel[];
  totalSum: number;

  constructor(
    private _service: ClientAppService,
    private _cartService: CartService,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.cartProductList = [];
    this.totalSum = 0;
  }

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      let role = this._authService.getUserRoles();
      this._service.setLoggedInUserRole(role);
    }

    this._cartService.cartUpdates$.subscribe(() => {
      this.totalSum = 0;

      this.cartProductList?.forEach((item) => {
        this.totalSum = this.totalSum + item.price * item.qty;
      });
    });

    this.getCartProductList();
  }

  getCartProductList() {
    this.cartProductList = this._cartService.cartProductList;

    this.cartProductList?.forEach((item) => {
      this.totalSum = this.totalSum + item.price * item.qty;
    });
  }

  changeQty(product: ProductModel) {
    console.log(product);
    this._cartService.addToCart(product);
  }

  deleteItem(cartItem: CartProductModel) {
    if (
      confirm('Are you sure? you need to delete the item : ' + cartItem.name)
    ) {
      this._cartService.removeFromCart(cartItem);
    }
  }

  checkoutCart() {
    if (this.cartProductList.length == 0) {
      alert('No Item to checkout');
      return;
    }

    if(!confirm('Are you sure? you need to checkout?')){
      return;
    }

    let order: OrderModel = {
      orderId: 0,
      userId: '',
      orderDate: new Date(),
      totalPrice: 0,
      status: '',
      orderItems: [],
    };

    order.status = CartStatusEnum.PENDING;
    order.totalPrice = this.totalSum;
    order.userId = 'c52c8ca3-234b-4406-82c7-0583e0122d35'; //This MUST BE logged in user id

    this.cartProductList.forEach((element) => {
      let orderItem: OrderItemModel = {
        orderItemId: 0,
        productId: element.productId,
        quantity: element.qty,
        price: element.price,
      };
      order.orderItems.push(orderItem);
    });

    this._service.addOrder(order).subscribe({
      next: (data) => {
        console.log(data);
        this._cartService.removeAllFromCart();
        alert('Success! your order has been checkout');
        this._router.navigate(['/customer-product']);
      },
      error: (err) => {
        console.log(err);
        alert('Error');
      },
      complete: () => {},
    });
  }

  goBack() {
    this._router.navigate(['/product-list']);
  }
}
