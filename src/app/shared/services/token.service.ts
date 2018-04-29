import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TokenService {

  private tokenSource = new BehaviorSubject<string>('default token');
  currentToken = this.tokenSource.asObservable();

  constructor() { }

  changeToken(token: string) {
    this.tokenSource.next(token);
  }


}
