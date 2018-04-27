import { Component, OnInit } from '@angular/core';
import { FacebookService, LoginResponse, InitParams } from 'ngx-facebook';
@Component({
  selector: 'app-fb-login',
  templateUrl: './fb-login.component.html',
  styleUrls: ['./fb-login.component.css']
})
export class FbLoginComponent implements OnInit {

  private fid: any;

  constructor(private fb: FacebookService) {

    const initParams: InitParams = { appId: '182905045764590', xfbml: true, version: 'v2.8' };

    this.fb.init(initParams);
   }

  loginWithFacebook(): void {
    this.fid = this.fb.login()
      .then( function(response: LoginResponse) {
        console.log( response );
        return response;
      }
      );

  }
 getProfile() {
  this.fb.api('/me?fields=id,name,email,picture')
  .then((res: any) => {
    console.log('Got the users profile', res);
  })
  .catch(this.handleError);
  }
  /*getLoginStatus() {
    this.fb.getLoginStatus()
      .then(console.log.bind(console))
      .catch(console.error.bind(console));
  }*/
  private handleError(error) {
    console.error('Error processing action', error);
  }

  ngOnInit() {
  }

}
