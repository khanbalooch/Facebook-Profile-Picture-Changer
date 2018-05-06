import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../shared/services/token.service';

@Component({
  selector: 'app-contentarea',
  templateUrl: './contentarea.component.html',
  styleUrls: ['./contentarea.component.css']
})
export class ContentareaComponent implements OnInit {

  token: string;
  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.tokenService.currentToken.subscribe(token => this.token = token);
  }
}
