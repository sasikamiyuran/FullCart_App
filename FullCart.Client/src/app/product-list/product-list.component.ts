import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../Models/product.model';
import { ClientAppService } from '../client-app.service';
import { CartService } from '../util_services/cart.service';
import { CartProductModel } from '../Models/cart-product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: ProductModel[];

  constructor(private _service: ClientAppService, private _cartService: CartService){
    this.products=[];
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.products = [];
    this._service.getProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.products = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  addToCart(product: ProductModel){
    this._cartService.addToCart(product);
  }

}
