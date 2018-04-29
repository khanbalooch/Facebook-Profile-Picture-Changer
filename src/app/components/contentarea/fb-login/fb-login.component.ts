import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FacebookService, LoginResponse, InitParams } from 'ngx-facebook';
import { TokenService } from '../../../shared/services/token.service';

@Component({
  selector: 'app-fb-login',
  templateUrl: './fb-login.component.html',
  styleUrls: ['./fb-login.component.css']
})
export class FbLoginComponent implements OnInit {
  constructor(
    private fb: FacebookService,
    private router: Router,
    private tokenService: TokenService) {

  const initParams: InitParams = { appId: '1251488264984736', xfbml: true, version: 'v2.8' };

  this.fb.init(initParams);
  }

  loginWithFacebook(): void {

    const instance: FbLoginComponent = this;

    this.fb.login()
      .then( function (response: LoginResponse) {

        console.log(response);

        if (response.status === 'connected') {

          instance.tokenService.changeToken(response.authResponse.accessToken);

          instance.router.navigateByUrl('show-profile');
        //console.log('routing to show profile');
      }
      });
  }
  private handleError(error) {
    console.error('Error processing action', error);
  }

  ngOnInit() {
  }
}
