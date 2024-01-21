import { Component, OnInit } from '@angular/core';
import { AuthService } from './util_services/auth.service';
import { Router } from '@angular/router';
import { UserRoleEnum } from './Enum/user-role.enum';
import { ClientAppService } from './client-app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FullCart.Client';
  loggedInUserRole: string = '';

  constructor(private _service: ClientAppService, private _authService: AuthService, private _router: Router){}

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkUserRole(){
    this._service.getLoggedInUserRole().subscribe((userRole)=>{
      this.loggedInUserRole = userRole;
    })
  }

  signOut(){
    if(this._authService.logOut()){
      this._service.setLoggedInUserRole('');
      this._router.navigate(['']);
    } else{
      alert('Somethig went wrong');
    }
  }
}
