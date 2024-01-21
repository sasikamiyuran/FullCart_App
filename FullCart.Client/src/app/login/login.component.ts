import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientAppService } from '../client-app.service';
import { AuthenticationRequestModel } from '../Models/authentication-request.model';
import { Router } from '@angular/router';
import { AuthService } from '../util_services/auth.service';
import { UserRoleEnum } from '../Enum/user-role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private _service: ClientAppService,
    private _router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      let body: AuthenticationRequestModel = {
        userName: this.loginForm.value.userName,
        password: this.loginForm.value.password,
      };

      this._service.login(body).subscribe({
        next: (data: any) => {
          console.log(data);
          if (data.statusCode == 401) {
            alert('Unauthorized');
            return;
          }

          localStorage.setItem('token', data.token);

          let roles = this._authService.getUserRoles();
          console.log(roles);
          
          if (roles == UserRoleEnum.ADMIN) {
            this._router.navigate(['/admin-product'])
          } else if (roles == UserRoleEnum.CUSTOMER) {
            this._router.navigate(['/customer-product']);
          } else {
            this._router.navigate(['/unauthorized'])
          }
        },
        error: (err: any) => {
          console.log(err);
          if (err.status == 401) {
            alert('Unauthorized');
          }
        },
        complete: () => {},
      });
    } else {
      alert('Invalid login form');
    }
  }
}
