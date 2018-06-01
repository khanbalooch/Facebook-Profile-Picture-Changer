import { Component, OnInit } from '@angular/core';
import { FacebookService, UIParams, UIResponse } from 'ngx-facebook';
import { TokenService } from '../../../shared/services/token.service';
import { User } from '../User';
import { Base64 } from 'js-base64';
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



  /*
  exportCanvasAsPNG(id, fileName) {

    var canvasElement = document.getElementById(id) as HTMLCanvasElement;;

    var MIME_TYPE = "image/png";

    var imgURL = canvasElement.toDataURL(MIME_TYPE);
    return imgURL;
    /*
        var dlLink = document.createElement('a');
        dlLink.download = fileName;
        dlLink.href = imgURL;
        dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
    
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
    
  
        *//*
  }
*/
  // Converts canvas to an image
  /*
  convertCanvasToImage(canvas) {
    var image = new Image();
    return image.src = canvas.toDataURL("image/jpeg", 0.1);

  }
  */


  //self try
  /*
  shareCanvFb(canvas: HTMLCanvasElement) {

    return canvas.toDataURL("image/jpeg", 0.1);


  }
  */







  /*===========================================================SHARE_ON_FACEBOOK==========================*/
  shareOnFacebook() {

    /*
    var canv = document.getElementById("postCanv") as HTMLCanvasElement;
    var imgUrl = canv.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, '');
    var imgUrl2 = canv.toDataURL('image/png');
    var image = new Image();
    image.src = imgUrl2;
    document.body.appendChild(image);
    */

    var canv = document.getElementById("postCanv") as HTMLCanvasElement;
    var dataURL  = canv.toDataURL('image/png');
    var data = atob(dataURL.substring("data:image/png;base64,".length)),
      asArray = new Uint8Array(data.length);
    for (var i = 0, len = data.length; i < len; ++i) {
      asArray[i] = data.charCodeAt(i);
    }

    var blob = new Blob([asArray.buffer], { type: "image/png" });

    console.log(blob);
    var img = document.createElement("img");
    img.src = (window.URL).createObjectURL(blob);
    console.log(img.src);
    //document.body.appendChild(img);



    //var data = $('#postCanv')[0].toDataURL("image/png");
   // try {

      //var blob = this.dataURItoBlob(data);
      //var file = new File([data], "testFname", { type: "image/png", lastModified: Date.now() });
      //console.log(file);

      // Make a Blob from the bytes
      //var blob = new Blob([bytes], { type: 'image/bmp' });

      // Use createObjectURL to make a URL for the blob
      /*
      var image = new Image();
      image.src = URL.createObjectURL(blob);
      document.body.appendChild(image);
      */

    //} catch (e) {
      //console.log(e);
    //}

    //var postImg = this.exportCanvasAsPNG('postCanv','tst');
    //var data = $('#postCanv')[0].toDataURL("image/png");
    //var canv = document.getElementById("postCanv") as HTMLCanvasElement;
    //var postImg = canv.toDataURL("image/png");
    //var postImg = canv.toDataURL("image/png").replace("image/png", "image/octet-stream");
    //console.log(postImg);
    //var postImg = this.convertCanvasToImage(canv);
    //var postImg = this.shareCanvFb(canv);
    //console.log(postImg);
    // document.write('<img src="' + postImg + '"/>');

    console.log(this.user.profilePicture);
    const params: UIParams = {
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
        object: {
          'og:url': 'https://uframe.wellupsolution.com',
          'og:title': 'My PM IS IMRAN KHAN',
          'og:description': 'VOTE FOR CHANGE',
          //'og:image': this.user.profilePicture
          'og:image': img.src
          
        }
      })
    };

    this.fb.ui(params).then(function (response: UIResponse) {
      console.log(response);


    });
  }




  /*===========================================================END_OF_CLASS===============================*/
}
