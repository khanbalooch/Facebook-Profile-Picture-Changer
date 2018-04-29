import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../shared/services/token.service';
import { FacebookService } from 'ngx-facebook';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {

  private accessToken: string;
  private name: string;
  private email: string;

  constructor(
    private tokenService: TokenService,
    private fb: FacebookService,
    private router: Router
    ) {

    this.tokenService.currentToken.subscribe( token => this.accessToken = token);

    this.getProfile();

    console.log('accessToken fromtoken service:' + this.accessToken);
   }
   getProfile() {
    this.fb.api('/me')
      .then((response: any) => {
        this.name = response.name;
        console.log('Got the users profile', response);
      })
      .catch(this.handleError);
  }

  ngOnInit() {

    setTimeout((router: Router) => { this.router.navigate(['fb-login']); }, 10000); //5s
  }

  private handleError(error) {
    console.error('Error processing action', error);
  }
}
