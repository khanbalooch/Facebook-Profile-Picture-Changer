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

/*===================================================MEMBER VARIABLES===============*/
  private userID: string;
  private accessToken: string;
  private imageID: string;
  private imagePath: string;
/*===================================================CONSTRUCTOR====================*/
  constructor(
    private fb: FacebookService,
    private router: Router,
    private tokenService: TokenService) {
  this.imagePath = '../../../assets/images/vote4pti.png';
  const initParams: InitParams = { appId: '225148018254033', xfbml: true, version: 'v3.0' };

  this.fb.init(initParams);
  }
/*===================================================NG_ON_INIT======================*/
  ngOnInit() {
  }
/*===================================================LOGIN_WITH_FACEBOOK=============*/
  loginWithFacebook(): void {

    const instance: FbLoginComponent = this;

    this.fb.login({scope: 'email,user_photos'})
      .then( function (response: LoginResponse) {

        if (response.status === 'connected') {

          instance.accessToken = response.authResponse.accessToken;
          instance.userID = response.authResponse.userID;

          instance.getProfilePictureAlbum();
          //instance.router.navigateByUrl('show-profile');
      }
      });
  }
/*===================================================GET PROFILE PIC ALBUM======*/

getProfilePictureAlbum() {
  const instance: FbLoginComponent = this;
  this.fb.api('/' + this.userID + '/albums').then(function(response) {

    if (response.data[0].name === 'Profile Pictures') {

      // Get a list of all photos in that album.
      instance.fb.api(response.data[0].id + '/photos?fields=link').then( function(response1) {

        instance.imageID = response1.data[0].id;
        instance.getImage();
      });
    }
  });
}
/*===================================================GET_IMAGE===============*/
  getImage() {
    const instance: FbLoginComponent = this;
    this.fb.api(this.imageID + '?fields=picture&access_token=' + this.accessToken).then(
      function (response) {
        instance.imagePath = 'https://graph.facebook.com/' + instance.imageID + '/picture?type=normal&access_token=' + instance.accessToken;
        console.log(instance.imagePath);
      }
    );
  }
/*===================================================HANDLE_ERROR===============*/
  private handleError(error) {
    console.error('Error processing action', error);
  }
/*===================================================END OF CLASS===============*/
}
