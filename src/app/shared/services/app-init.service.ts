import { APP_INITIALIZER, Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(private global: GlobalService, private loginService: LoginService) {}

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
      }
      resolve();
    });
  }
}

export const appInitProviders = [
  {
    provide: APP_INITIALIZER,
    multi: true,
    deps: [AppInitService],
    useFactory: (appInitService: AppInitService) => () => appInitService.init(),
  },
];
