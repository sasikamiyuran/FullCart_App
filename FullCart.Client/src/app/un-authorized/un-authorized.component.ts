import { Component, OnInit } from '@angular/core';
import { ClientAppService } from '../client-app.service';
import { AuthService } from '../util_services/auth.service';

@Component({
  selector: 'app-un-authorized',
  templateUrl: './un-authorized.component.html',
  styleUrls: ['./un-authorized.component.css']
})
export class UnAuthorizedComponent implements OnInit {

  constructor(private _service: ClientAppService, private _authService: AuthService){}

  ngOnInit(): void {
    if(this._authService.isAuthenticated()){
      let role = this._authService.getUserRoles();
      this._service.setLoggedInUserRole(role);
    }
  }

}
