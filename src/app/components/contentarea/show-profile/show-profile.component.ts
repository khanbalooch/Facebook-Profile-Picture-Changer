import { Component, OnInit } from '@angular/core';
import { FacebookService, UIParams, UIResponse } from 'ngx-facebook';
import { TokenService } from '../../../shared/services/token.service';
import { User } from '../User';
import { HttpClient } from '@angular/common/http';
import { Base64 } from 'js-base64';
import * as html2canvas from 'html2canvas';

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
  constructor(private tokenService: TokenService,
              private fb: FacebookService,
              private http: HttpClient) {

    this.tokenService.currentToken.subscribe(token => this.user = User.parse(token));
  }
  /*===========================================================NG_ON_INIT==================================*/
  ngOnInit() {

    this.backgroundImg = this.user.profilePicture;
    //this.combineImages();
    this.mergeTwoImg();
  }
  /*===========================================================COMBINE_IMGES==================================*/

  combineImages() {

    const c: any = document.getElementById('postCanv');
    const ctx = c.getContext('2d');

    var uImg = new Image();
    var frameImg = new Image();

    uImg.onload = function () {
      ctx.drawImage(uImg, 0, 0, uImg.width, uImg.height,     // source rectangle
        0, 0, c.width, c.height); // destination rectangle
      ctx.drawImage(frameImg, 10, 10, frameImg.width, frameImg.height,     // source rectangle
        0, 0, c.width, c.height); // destination rectangle
    };
    uImg.src = this.user.profilePicture;
    frameImg.src = '../../../../assets/images/IK-with-flag.png';

    uImg.crossOrigin = 'Anonymous';
    // frameImg.crossOrigin = "Anonymous";
  }

  mergeTwoImg(){
    var c: any = document.getElementById("postCanv");
    var ctx = c.getContext("2d");
    var imageObj1 = new Image();
    var imageObj2 = new Image();
    imageObj1.crossOrigin = 'Anonymous';
    imageObj2.crossOrigin = 'Anonymous';
    imageObj1.src = this.user.profilePicture;
    imageObj1.onload = function () {
      ctx.drawImage(imageObj1, 0, 0, imageObj1.width, imageObj1.height, 0 , 0 , c.width, c.height);
      imageObj2.src = '../../../../assets/images/IK-with-flag.png';
      imageObj2.onload = function () {
        ctx.drawImage(imageObj2, 0, 0, imageObj2.width, imageObj2.height, 0, 0, c.width, c.height);
        //var img = c.toDataURL("image/png");
       // document.write('<img src="' + img + '" width="328" height="526"/>');
      }
    };
  }
  /*===========================================================DATAURI_TO_BLOB==================================*/

  dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
  }
  /*===========================================================SHARE_ON_FACEBOOK==========================*/
  shareOnFacebook() {

    const data = $('#postCanv')[0].toDataURL('image/png');
    try {
      const blob = this.dataURItoBlob(data);
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
          'og:image': 'https://storage.googleapis.com/test-205317/' + this.user.userID + '_1.jpg'
        }
      })
    };
    this.fb.ui(params).then(function (response: UIResponse) {
      console.log(response);
    });
  }
  /*===========================================================NG_ON_INIT==================================*/
  shareOnFb() {
    const data = $('#postCanv')[0].toDataURL('image/png');
    try {
      const blob = this.dataURItoBlob(data);
      console.log(blob);
    } catch (e) {
      console.log(e);
    }
  }
   /*===========================================================UPLOAD_STORY===============================*/
   saveImage() {
     const instance  = this;
    let  blob;
    const data = $('#postCanv')[0].toDataURL('image/png');
    try {
      blob = this.dataURItoBlob(data);
      //const result: File =  this.blobToFile(blob);
    } catch (e) {
      console.log(e);
    }
    console.log('blob:' + blob);
    const formData = new FormData();
    formData.set('upl', blob);
    formData.set('filename', this.user.userID + '_1.jpg');
    this.http.post('https://test-205317.appspot.com/uploadImage', formData, {responseType: 'text'}).subscribe(function() {
      console.log('picture saved');
      instance.shareOnFacebook();
    });
   }
  /*===========================================================END_OF_CLASS===============================*/
}
