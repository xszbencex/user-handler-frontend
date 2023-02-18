import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../shared/services/global.service';
import { UserDTO } from '../../shared/models/UserDTO';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isRegistration = false;
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: UserService, private router: Router, public global: GlobalService) {
    if (global.isLoggedInStatus) {
      this.router.navigate(['/home']).then();
    }
    this.createForm();
  }

  public toggleState() {
    if (this.isRegistration) {
      this.email.clearValidators();
      this.email.disable();
    } else {
      this.email.addValidators([Validators.required, Validators.email]);
      this.email.enable();
    }
    this.isRegistration = !this.isRegistration;
  }

  public async submit() {
    if (this.loginForm.invalid) {
      return;
    }
    if (this.isRegistration) {
      this.loginService.signUp(this.constructUser()).subscribe({
        next: response => this.login(response),
        error: (error: HttpErrorResponse) => {
          if (error.status === 422) {
            this.global.messageDialog('A felhasználónév foglalt!');
          } else {
            this.global.messageDialog('Sikertelen regisztráció!');
          }
        },
      });
    } else {
      this.loginService.signIn(this.username.value, this.password.value).subscribe({
        next: response => this.login(response),
        error: (error: HttpErrorResponse) => {
          if (error.status === 422) {
            this.global.messageDialog('Hibás felhasználónév vagy jelszó!');
          } else {
            this.global.messageDialog('Sikertelen belépés!');
          }
        },
      });
    }
  }

  private async login(jwtToken: string) {
    this.global.isLoggedInStatus = true;
    this.global.jwtToken = jwtToken;
    localStorage.setItem('token', jwtToken);
    this.loginService
      .getUserInfo()
      .subscribe(response => (this.global.loggedInAccount = response))
      .add(() => this.router.navigate(['/home']).then());
  }

  private constructUser(): UserDTO {
    return {
      username: this.username.value,
      password: this.password.value,
      email: this.email.value,
      roles: [],
    } as UserDTO;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: [{ value: '', disabled: true }, []],
    });
  }

  get username() {
    return this.loginForm.get('username') as FormControl;
  }
  get password() {
    return this.loginForm.get('password') as FormControl;
  }
  get email() {
    return this.loginForm.get('email') as FormControl;
  }
}
