import { Component, OnInit } from '@angular/core';
import { FacebookService } from 'ngx-facebook';
import { TokenService } from '../../../shared/services/token.service';
import { User } from '../User';
@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {
  public backgroundImg: any;
  user: User;
  

  constructor(private tokenService: TokenService) {
    
    this.tokenService.currentToken.subscribe(token => this.user =  User.parse( token));
  }

  ngOnInit() {
    this.backgroundImg = this.user.profilePicture;
  }
  

}
