import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryModel } from 'src/app/Models/category.model';
import { ClientAppService } from 'src/app/client-app.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {
  category: CategoryModel;

  constructor(private _service: ClientAppService,
    private _router: Router,
    private _activateRoute: ActivatedRoute){
    this.category ={name: '', categoryId: 0, imagePath: ''}
  }
  
  ngOnInit(): void {
    let Id = this._activateRoute.snapshot.paramMap.get('id');
    if (Id != null || Id != undefined) {
      this.getCategoryById(+Id);
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

  backToList() {
    this._router.navigate(['/categories']);
  }

}
