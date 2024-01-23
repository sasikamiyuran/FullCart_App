import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/Models/category.model';
import { ClientAppService } from 'src/app/client-app.service';
import { AuthService } from 'src/app/util_services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: CategoryModel[];

  constructor(
    private _service: ClientAppService,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.categories = [];
  }

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      let role = this._authService.getUserRoles();
      this._service.setLoggedInUserRole(role);
    }

    this.getAllCategories();
  }

  getAllCategories() {
    this.categories = [];
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

  addNewCategory() {
    this._router.navigate(['category-add']);
  }

  updateCategory(Id: number) {
    this._router.navigate(['category-add/' + Id]);
  }

  deleteCategory(categoryId: number, categoryName: string) {
    if (confirm('Are you sure delete ' + categoryName)) {
      this._service.deleteCategory(categoryId).subscribe({
        next: (data) => {
          this.getAllCategories();
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
    }
  }
}
