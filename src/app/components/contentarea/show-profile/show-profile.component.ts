import { Component, OnInit } from '@angular/core';
import { FacebookService, UIParams, UIResponse } from 'ngx-facebook';
import { TokenService } from '../../../shared/services/token.service';
import { User } from '../User';
import { HttpClient } from '@angular/common/http';

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
    this.combineImages();
  }
  /*===========================================================COMBINE_IMGES==================================*/

  combineImages() {

    const c: any = document.getElementById('postCanv');
    const ctx = c.getContext('2d');

    const uImg = new Image;
    const frameImg = new Image;

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

    uImg.crossOrigin = 'Anonymous';
    // frameImg.crossOrigin = "Anonymous";

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
    const params: UIParams = {
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
        object: {
          'og:url': 'https://uframe.wellupsolution.com',
          'og:title': 'My PM IS IMRAN KHAN',
          'og:description': 'VOTE FOR CHANGE',
          'og:image': 'https://storage.googleapis.com/test-205317/' + this.user.userID + '.jpg'
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

  public blobToFile = (theBlob: Blob): File => {
    const b: any = theBlob;
    // A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = 'result.png';

    // Cast to a File() type
    return <File>theBlob;
  }
   /*===========================================================UPLOAD_STORY===============================*/
   saveImage() {
    let  blob;
    const data = $('#postCanv')[0].toDataURL('image/png');
    try {
      blob = this.dataURItoBlob(data);
      const result: File =  this.blobToFile(blob);
    } catch (e) {
      console.log(e);
    }
    console.log('blob:' + blob);
    const formData = new FormData();
    formData.set('upl', blob);
    this.http.post('https://test-205317.appspot.com/uploadImage', formData).subscribe(
      function(reponse) {
          this.shareOnFacebook();
      }
    );
   }
  /*===========================================================END_OF_CLASS===============================*/
}
