import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandModel } from 'src/app/Models/brand.model';
import { ClientAppService } from 'src/app/client-app.service';

@Component({
  selector: 'app-new-brand',
  templateUrl: './new-brand.component.html',
  styleUrls: ['./new-brand.component.css'],
})
export class NewBrandComponent implements OnInit {
  brand: BrandModel;
  brandId!: number | null;

  constructor(
    private _service: ClientAppService,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) {
    this.brand = {
      brandId: 0,
      name: '',
      imagePath: '',
    };
  }

  ngOnInit(): void {
    let Id = this._activateRoute.snapshot.paramMap.get('id');
    if (Id != null || Id != undefined) {
      this.getBrandById(+Id);
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

  backToList() {
    this._router.navigate(['/brands']);
  }
}
