import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandModel } from 'src/app/Models/brand.model';
import { CategoryModel } from 'src/app/Models/category.model';
import { ProductModel } from 'src/app/Models/product.model';
import { ClientAppService } from 'src/app/client-app.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  product: ProductModel;
  productId!: number | null;

  categories: CategoryModel[];
  brands: BrandModel[];

  constructor(
    private _service: ClientAppService,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) {
    this.product = {
      productId: 0,
      name: '',
      description: '',
      price: 0,
      brandId: 0,
      categoryId: 0,
      quantity: 0,
      imagePath: '',
    };
    this.categories = [];
    this.brands = [];
  }

  ngOnInit(): void {
    let Id = this._activateRoute.snapshot.paramMap.get('id');
    if (Id != null || Id != undefined) {
      this.getProductById(+Id);
    }

    this.getBrands();
    this.getAllCategories();
  }

  getBrands() {
    this._service.getBrands().subscribe({
      next: (data) => {
        console.log(data);
        this.brands = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  getAllCategories() {
    this._service.getCategories().subscribe({
      next: (data) => {
        console.log(data);
        this.categories = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  getProductById(id: number) {
    this._service.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  addNewProduct() {
    this._service.addProduct(this.product).subscribe({
      next: (data) => {
        console.log(data);
        this.backToList();
      },
      error: (err) => {
        console.log(err);
        alert('Error');
      },
      complete: () => {},
    });
  }

  backToList() {
    this._router.navigate(['/products']);
  }
}
