import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/Models/product.model';
import { ClientAppService } from 'src/app/client-app.service';
import { AuthService } from 'src/app/util_services/auth.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: ProductModel[];
  @ViewChild('TABLE') table: ElementRef;

  constructor(
    private _service: ClientAppService,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.products = [];
    this.table = {} as ElementRef;
  }

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      let role = this._authService.getUserRoles();
      this._service.setLoggedInUserRole(role);
    }

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

  addNewProduct() {
    this._router.navigate(['product-add']);
  }

  updateProduct(Id: number) {
    this._router.navigate(['product-add/' + Id]);
  }

  deleteProduct(productId: number, productName: string) {
    if (confirm('Are you sure delete ' + productName)) {
      this._service.deleteProduct(productId).subscribe({
        next: (data) => {
          this.getAllProducts();
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
    }
  }

  export() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'ProductList.xlsx');
  }
}
