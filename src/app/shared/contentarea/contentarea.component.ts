import { Component, OnInit } from '@angular/core';
import { FacebookService, LoginResponse, InitParams } from 'ngx-facebook';
@Component({
  selector: 'app-contentarea',
  templateUrl: './contentarea.component.html',
  styleUrls: ['./contentarea.component.css']
})
export class ContentareaComponent implements OnInit {
  private fid: any;
  constructor(private fb: FacebookService) {

    const initParams: InitParams = { appId: '182905045764590', xfbml: true, version: 'v2.8' };

    this.fb.init(initParams);
  }

  loginWithFacebook(): void {
    this.fid = this.fb.login()
      .then(function (response: LoginResponse) {
        console.log(response);
        return response;
      }
      );

  }
  getProfile() {
    this.fb.api('/me?fields=name,email,picture&type=large&redirect=true')
      //this.fb.api('/992219777612936/picture?type=large&redirect=true')
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
