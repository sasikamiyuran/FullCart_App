import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryModel } from 'src/app/Models/category.model';
import { ClientAppService } from 'src/app/client-app.service';
import { AuthService } from 'src/app/util_services/auth.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css'],
})
export class NewCategoryComponent implements OnInit {
  category: CategoryModel;
  categoryId!: string | null;

  constructor(
    private _service: ClientAppService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _authService: AuthService
  ) {
    this.category = { name: '', categoryId: 0, imagePath: '' };
    this.categoryId = '0';
  }

  ngOnInit(): void {
    if(this._authService.isAuthenticated()){
      let role = this._authService.getUserRoles();
      this._service.setLoggedInUserRole(role);
    }

    this.categoryId = this._activateRoute.snapshot.paramMap.get('id');
    if (
      this.categoryId != '0' &&
      this.categoryId != null &&
      this.categoryId != undefined
    ) {
      this.getCategoryById(+this.categoryId);
    }
  }

  getCategoryById(id: number) {
    this._service.getCategoryById(id).subscribe({
      next: (data) => {
        this.category = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  addNewCategory() {
    if (
      this.categoryId != '0' &&
      this.categoryId != null &&
      this.categoryId != undefined
    ) {
      this._service.updateCategory(+this.categoryId, this.category).subscribe({
        next: (data) => {
          this.backToList();
        },
        error: (err) => {
          console.log(err);
          alert('Error');
        },
        complete: () => {},
      });
    } else {
      this._service.addCategory(this.category).subscribe({
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
    this._router.navigate(['/categories']);
  }
}
