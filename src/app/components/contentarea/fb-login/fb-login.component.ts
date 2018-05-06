import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FacebookService, LoginResponse, InitParams } from 'ngx-facebook';
import { TokenService } from '../../../shared/services/token.service';
import { User } from '../User';
import { get } from 'selenium-webdriver/http';

@Component({
  selector: 'app-fb-login',
  templateUrl: './fb-login.component.html',
  styleUrls: ['./fb-login.component.css']
})
export class FbLoginComponent implements OnInit {

/*===================================================MEMBER VARIABLES===============*/
  private user: User;
/*===================================================CONSTRUCTOR====================*/
  constructor(
    private fb: FacebookService,
    private router: Router,
    private tokenService: TokenService) {

  this.user = new User('-', '-', '-', '-', '-', '-');
  const initParams: InitParams = { appId: '1251488264984736', xfbml: true, version: 'v3.0' };

  this.fb.init(initParams);
  }
/*===================================================NG_ON_INIT======================*/
  ngOnInit() {
  }
/*===================================================LOGIN_WITH_FACEBOOK=============*/
  loginWithFacebook(): void {

    const instance: FbLoginComponent = this;

    this.fb.login({scope: 'email,user_photos,user_gender'})
      .then( function (response: LoginResponse) {

        if (response.status === 'connected') {

          instance.user.accessToken = response.authResponse.accessToken;
          instance.user.userID = response.authResponse.userID;
          instance.getUserNameAndEmail();
          //instance.getProfilePictureAlbum();
          // instance.router.navigateByUrl('show-profile');
      }
      });
  }

/*===================================================GET PROFILE PIC ALBUM======*/

getUserNameAndEmail() {
  const instance: FbLoginComponent = this;
 this.fb.api('me?fields=name,email').then(function(response) {
      instance.user.name = response.name;
      instance.user.email = response.email;
      instance.getProfilePictureAlbum();
      console.log(response);
  });
}

/*===================================================GET PROFILE PIC ALBUM======*/

getProfilePictureAlbum() {
  const instance: FbLoginComponent = this;
  this.fb.api('/' + this.user.userID + '/albums').then(function(response) {

    if (response.data[0].name === 'Profile Pictures') {

      // Get a list of all photos in that album.
      instance.fb.api(response.data[0].id + '/photos?fields=link').then( function(response1) {

        instance.user.profilePictureID = response1.data[0].id;
        instance.getImage();
      });
    }
  });
}
/*===================================================GET_IMAGE===============*/
getImage() {
  // instance.imagePath = 'https://graph.facebook.com/' + instance.imageID + '/picture?type=normal&access_token=' + instance.accessToken;
  this.user.profilePicture = 'https://graph.facebook.com/' + this.user.profilePictureID + '/picture?type=normal&access_token=' + this.user.accessToken;

  this.tokenService.changeToken( JSON.stringify(this.user) );
  this.router.navigateByUrl('show-profile');

  /*this.fb.api(this.imageID + '?fields=picture&access_token=' + this.accessToken).then(
    function(response) {

      console.log(instance.imagePath);
    }
  );*/
}
/*===================================================HANDLE_ERROR===============*/
  private handleError(error) {
    console.error('Error processing action', error);
  }
/*===================================================END OF CLASS===============*/
}