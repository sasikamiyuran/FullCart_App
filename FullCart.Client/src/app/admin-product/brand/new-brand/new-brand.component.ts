import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandModel } from 'src/app/Models/brand.model';
import { ClientAppService } from 'src/app/client-app.service';
import { AuthService } from 'src/app/util_services/auth.service';

@Component({
  selector: 'app-new-brand',
  templateUrl: './new-brand.component.html',
  styleUrls: ['./new-brand.component.css'],
})
export class NewBrandComponent implements OnInit {
  brand: BrandModel;
  brandId!: string | null;

  constructor(
    private _service: ClientAppService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _authService: AuthService
  ) {
    this.brand = {
      brandId: 0,
      name: '',
      imagePath: '',
    };
    this.brandId = '0';
  }

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      let role = this._authService.getUserRoles();
      this._service.setLoggedInUserRole(role);
    }

    this.brandId = this._activateRoute.snapshot.paramMap.get('id');
    if (
      this.brandId != '0' &&
      this.brandId != null &&
      this.brandId != undefined
    ) {
      this.getBrandById(+this.brandId);
    }
  }

  getBrandById(id: number) {
    this._service.getBrandById(id).subscribe({
      next: (data) => {
        this.brand = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  addNewBrand() {
    if (
      this.brandId != null &&
      this.brandId != '0' &&
      this.brandId != undefined
    ) {
      this._service.updateBrand(+this.brandId, this.brand).subscribe({
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
    } else {
      this._service.addBrand(this.brand).subscribe({
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
  }

  backToList() {
    this._router.navigate(['/brands']);
  }
}
