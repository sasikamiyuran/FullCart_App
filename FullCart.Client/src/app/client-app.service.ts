import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthenticationRequestModel } from './Models/authentication-request.model';
import { UserRoleEnum } from './Enum/user-role.enum';
import { AuthService } from './util_services/auth.service';
import { BrandModel } from './Models/brand.model';
import { ProductModel } from './Models/product.model';
import { CategoryModel } from './Models/category.model';
import { OrderModel } from './Models/order.model';

const baseUrl = 'http://localhost:5222/';

@Injectable({
  providedIn: 'root',
})
export class ClientAppService {
  private _loggedInUserRole: Subject<string> = new Subject<string>();

  constructor(private _http: HttpClient, private _authService: AuthService) {}

  getLoggedInUserRole(): Observable<string> {
    return this._loggedInUserRole.asObservable();
  }

  setLoggedInUserRole(newLang: any): void {
    this._loggedInUserRole.next(newLang);
  }

  // Attach JWT token to headers
  private getHeaders(): HttpHeaders {
    const token = this._authService.getToken(); // Implement this method to get your JWT token
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  login(body: AuthenticationRequestModel): Observable<any> {
    return this._http.post(`${baseUrl}api/Authentication/Authenticate`, body);
  }

  //Brand Services
  getBrands(): Observable<any> {
    const header = this.getHeaders();
    return this._http.get(`${baseUrl}api/Brands`, { headers: header });
  }

  getBrandById(Id: number): Observable<any> {
    const header = this.getHeaders();
    return this._http.get(`${baseUrl}api/Brands/` + Id, { headers: header });
  }

  addBrand(brand: BrandModel): Observable<any> {
    const header = this.getHeaders();
    return this._http.post(`${baseUrl}api/Brands`, brand, { headers: header });
  }

  updateBrand(Id: number, brand: BrandModel): Observable<any> {
    const header = this.getHeaders();
    return this._http.put(`${baseUrl}api/Brands/${Id}`, brand, { headers: header });
  }

  deleteBrand(Id: number): Observable<any> {
    const header = this.getHeaders();
    return this._http.delete(`${baseUrl}api/Brands/${Id}`, { headers: header });
  }

  //Category Services
  getCategories(): Observable<any> {
    const header = this.getHeaders();
    return this._http.get(`${baseUrl}api/Categories`, { headers: header });
  }

  getCategoryById(Id: number): Observable<any> {
    const header = this.getHeaders();
    return this._http.get(`${baseUrl}api/Categories/` + Id, { headers: header });
  }

  addCategory(brand: CategoryModel): Observable<any> {
    const header = this.getHeaders();
    return this._http.post(`${baseUrl}api/Categories`, brand, { headers: header });
  }

  updateCategory(Id: number, brand: CategoryModel): Observable<any> {
    const header = this.getHeaders();
    return this._http.put(`${baseUrl}api/Categories/${Id}`, brand, { headers: header });
  }

  deleteCategory(Id: number): Observable<any> {
    const header = this.getHeaders();
    return this._http.delete(`${baseUrl}api/Categories/${Id}`, { headers: header });
  }

  //Product Services
  getProducts(): Observable<any> {
    const header = this.getHeaders();
    return this._http.get(`${baseUrl}api/Products`, { headers: header });
  }

  getProductById(Id: number): Observable<any> {
    const header = this.getHeaders();
    return this._http.get(`${baseUrl}api/Products/` + Id, { headers: header });
  }

  addProduct(brand: ProductModel): Observable<any> {
    const header = this.getHeaders();
    return this._http.post(`${baseUrl}api/Products`, brand, { headers: header });
  }

  updateProduct(Id: number, brand: ProductModel): Observable<any> {
    const header = this.getHeaders();
    return this._http.put(`${baseUrl}api/Products/${Id}`, brand, { headers: header });
  }

  deleteProduct(Id: number): Observable<any> {
    const header = this.getHeaders();
    return this._http.delete(`${baseUrl}api/Products/${Id}`, { headers: header });
  }

   //Order Services
   getOrders(): Observable<any> {
    const header = this.getHeaders();
    return this._http.get(`${baseUrl}api/Orders`, { headers: header });
  }

  getOrderById(Id: number): Observable<any> {
    const header = this.getHeaders();
    return this._http.get(`${baseUrl}api/Orders/` + Id, { headers: header });
  }

  addOrder(brand: OrderModel): Observable<any> {
    const header = this.getHeaders();
    return this._http.post(`${baseUrl}api/Orders`, brand, { headers: header });
  }

  updateOrder(Id: number, status: string): Observable<any> {
    console.log(status);
    
    const header = this.getHeaders();
    return this._http.put(`${baseUrl}api/Orders/${Id}/${status}`, { headers: header });
  }

  getOrderItemProductByOrderId(Id: number): Observable<any> {
    const header = this.getHeaders();
    return this._http.get(`${baseUrl}api/Orders/itemProduct/` + Id, { headers: header });
  }

}
