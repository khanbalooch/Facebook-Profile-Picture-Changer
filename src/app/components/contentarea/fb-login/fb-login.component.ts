import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FacebookService, LoginResponse, InitParams } from 'ngx-facebook';
import { TokenService } from '../../../shared/services/token.service';
import { User } from '../User';
import { HttpClient, HttpParams } from '@angular/common/http';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-fb-login',
  templateUrl: './fb-login.component.html',
  styleUrls: ['./fb-login.component.css']
})
export class FbLoginComponent implements OnInit {

/*===================================================MEMBER VARIABLES===============*/
  private user: User;
  flag = false;
  private fbApi = 'https://test-205317.appspot.com';
  private gcsBucket = 'https://storage.googleapis.com/test-205317/';
  isActive:boolean = false;
/*===================================================CONSTRUCTOR====================*/
  constructor(
    private fb: FacebookService,
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenService) {

  this.user = new User('-', '-', '-', '-', '-', '-');
    const initParams: InitParams = { appId: '1251488264984736', xfbml: true, version: 'v3.0' };

  this.fb.init(initParams);
  }
/*===================================================NG_ON_INIT======================*/
  ngOnInit() {
  }

  /*====================================Loading icon on Login Button================ */
  onWait() {
    return this.flag == true ?  'on-wait' : '';
  }
/*===================================================LOGIN_WITH_FACEBOOK=============*/
  loginWithFacebook(): void {
    this.flag = true;
    
    
    
    /*
    $("").appendTo(".btn-fbloginbtn");
    $( "p" ).append( "<strong>Hello</strong>" );
    $('#loginBtn').append("fa").attr("name", "ellipsis-v").attr("animation", "spin");
      var loadSpan = document.createElement("span").appendChild(document.createTextNode('انتظارکیجے '));
    document.getElementById('loginBtn').appendChild(loadSpan);
   
    <fa name='ellipsis-v' animation='spin'></fa>
    */
    
    
    const instance: FbLoginComponent = this;

    this.fb.login({scope: 'email,user_photos'})
      .then( function (response: LoginResponse) {

        if (response.status === 'connected') {

          instance.user.accessToken = response.authResponse.accessToken;
          instance.user.userID = response.authResponse.userID;
          instance.newUser();
      }
      });
  }

/*===================================================GET PROFILE PIC ALBUM======*/

newUser() {
  const instance: FbLoginComponent = this;
  this.http.get(this.fbApi + '/newUser/' + this.user.userID + '/' + this.user.accessToken,
  {
     responseType: 'text'
  }
)
  .subscribe(
    data => {
      this.user.profilePicture =  this.gcsBucket + this.user.userID + '.jpg';
      console.log(this.user);
      this.tokenService.changeToken( JSON.stringify(this.user) );
      this.router.navigateByUrl('show-profile');
    });
}
/*===================================================HANDLE_ERROR===============*/
  private handleError(error) {
    console.error('Error processing action:', error);
  }
/*===================================================END OF CLASS===============*/
}
