import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(private global: GlobalService, private loginService: UserService) {}

  init(): Promise<any> {
    return new Promise<void>(async resolve => {
      const token = localStorage.getItem('token');
      if (token) {
        this.global.jwtToken = token;
        this.loginService
          .getUserInfo()
          .subscribe({
            next: response => {
              this.global.isLoggedInStatus = true;
              this.global.loggedInAccount = response;
            },
            error: () => {
              this.global.jwtToken = undefined;
              localStorage.removeItem('token');
            },
          })
          .add(() => resolve());
      } else {
        resolve();
      }
    });
  }
}
