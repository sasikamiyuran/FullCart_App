import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartProductModel } from '../Models/cart-product.model';
import { ProductModel } from '../Models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartUpdates: Subject<string> = new Subject<string>();
  public cartUpdates$ = this._cartUpdates.asObservable();
  cartProductList: CartProductModel[];

  public get count(): number {
    return this.cartProductList.reduce((c, t1) => t1.qty + c, 0);
  }

  constructor() {
    this.cartProductList = [];
  }

  addToCart(product: ProductModel) {
    let item: CartProductModel = this.cartProductList.find(
      (item) => item.productId == product.productId
    ) as CartProductModel;

    if (item) {
      item.qty++;
    } else {
      let cartItem: CartProductModel = product as CartProductModel;
      cartItem.qty = 1;
      this.cartProductList.push(cartItem);
    }

    this._cartUpdates.next('');
  }
}
