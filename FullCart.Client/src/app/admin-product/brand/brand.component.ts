import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandModel } from 'src/app/Models/brand.model';
import { ClientAppService } from 'src/app/client-app.service';
import { AuthService } from 'src/app/util_services/auth.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: BrandModel[] = [];

  constructor(
    private _service: ClientAppService,
    private _router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      let role = this._authService.getUserRoles();
      this._service.setLoggedInUserRole(role);
    }

    this.getBrands();
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

  addNewBrand() {
    this._router.navigate(['brand-add']);
  }

  updateBrand(Id: number) {
    this._router.navigate(['brand-add/' + Id]);
  }

  deleteBrand(brandId: number, brandName: string) {
    if (confirm('Are you sure delete ' + brandName)) {
      this._service.deleteBrand(brandId).subscribe({
        next: (data) => {
          this.brands = [];
          this.getBrands();
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
    }
  }
}
