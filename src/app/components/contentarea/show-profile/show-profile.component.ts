import { Component, OnInit } from '@angular/core';
import { FacebookService, UIParams, UIResponse } from 'ngx-facebook';
import { TokenService } from '../../../shared/services/token.service';
import { User } from '../User';
import * as html2canvas from 'html2canvas';
import { post } from 'selenium-webdriver/http';
//import mergeImages from 'merge-images';

declare var jquery: any;
declare var $: any;



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

    this.tokenService.currentToken.subscribe(token => this.user = User.parse(token));
  }
  /*===========================================================NG_ON_INIT==================================*/
  ngOnInit() {

    this.backgroundImg = this.user.profilePicture;
    this.combineImages();

    //var frameImg  = '../../../../assets/images/IK-with-flag.png';
  }

  combineImages() {

    var c: any = document.getElementById("postCanv");
    var ctx = c.getContext("2d");

    var uImg = new Image;
    var frameImg = new Image;

    uImg.onload = function () {
      ctx.drawImage(uImg, 0, 0, uImg.width, uImg.height,     // source rectangle
        0, 0, c.width, c.height); // destination rectangle
      ctx.drawImage(frameImg, 0, 0, frameImg.width, frameImg.height,     // source rectangle
        0, 0, c.width, c.height); // destination rectangle
    };
    /*
    frameImg.onload = function () {
      ctx.drawImage(frameImg, 0, 0, frameImg.width, frameImg.height,     // source rectangle
        0, 0, c.width, c.height); // destination rectangle
    };
    */

    uImg.src = this.user.profilePicture;
    frameImg.src = '../../../../assets/images/IK-with-flag.png';

    uImg.crossOrigin = "Anonymous";
    //frameImg.crossOrigin = "Anonymous";

  }

  /** */
  dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
  }









  /*===========================================================SHARE_ON_FACEBOOK==========================*/
  shareOnFacebook() {
 
    var data = $('#postCanv')[0].toDataURL("image/png");
    try {
      var blob = this.dataURItoBlob(data);
      console.log(blob);
    } catch (e) {
      console.log(e);
    }



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

    this.fb.ui(params).then(function (response: UIResponse) {
      console.log(response);


    });
  }

  shareOnFb() {
    var data = $('#postCanv')[0].toDataURL("image/png");
    try {
      var blob = this.dataURItoBlob(data);
      console.log(blob);
    } catch (e) {
      console.log(e);
    }

  }




  /*===========================================================END_OF_CLASS===============================*/
}
