import { Component, OnInit } from '@angular/core';
import { FacebookService, UIParams, UIResponse } from 'ngx-facebook';
import { TokenService } from '../../../shared/services/token.service';
import { User } from '../User';
// import mergeImages from 'merge-images';
// import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {

 /*===========================================================MEMBER_VARIABLES==========================*/
  public backgroundImg: any;
  user: User;

/*===========================================================CONSTRUCTOR=================================*/
  constructor(private tokenService: TokenService, private fb: FacebookService) {

    this.tokenService.currentToken.subscribe(token => this.user =  User.parse( token));
  }
/*===========================================================NG_ON_INIT==================================*/
  ngOnInit() {
    this.backgroundImg = this.user.profilePicture;
  }

  /*loadImage() {
    mergeImages([ this.user.profilePicture, '../../../../assets/images/IK-with-flag.png'])
    .then(b64 => document.querySelector('img').src = b64);
  }*/
/*===========================================================DOWNLOAD_IMAGE==========================*/
  loadImage() {
  }
/*===========================================================SHARE_ON_FACEBOOK==========================*/
  shareOnFacebook() {
      const params: UIParams = {
        method: 'share_open_graph',
        action_type: 'og.shares',
        action_properties: JSON.stringify({
            object: {
                'og:url': 'https://uframe.wellupsolution.com',
                'og:title': 'My PM IS IMRAN KHAN',
                'og:description': 'VOTE FOR CHANGE',
                'og:image': this.user.profilePicture
            }
        })
      };

      this.fb.ui(params).then(function(response: UIResponse) {
          console.log(response);
      });
  }
/*===========================================================END_OF_CLASS===============================*/
}
