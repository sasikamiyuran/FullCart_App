import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandModel } from 'src/app/Models/brand.model';
import { ClientAppService } from 'src/app/client-app.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: BrandModel[] = [];

  constructor(private _service: ClientAppService, private _router: Router) {}

  ngOnInit(): void {
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
}
