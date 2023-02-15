import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { UserDTO } from '../models/UserDTO';
import { UserResponseDTO } from '../models/UserResponseDTO';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = '/user';

  constructor(private restService: RestService) {}

  public signIn(username: string, password: string): Observable<string> {
    const url = `${this.baseUrl}/signIn`;
    const options = {
      params: new HttpParams().set('username', username).set('password', password),
    };
    return this.restService.restCall('POST', url, options);
  }

  public signUp(user: UserDTO): Observable<string> {
    const url = `${this.baseUrl}/signUp`;
    const options = {
      body: user,
    };
    return this.restService.restCall('POST', url, options);
  }

  public getUserInfo(): Observable<UserResponseDTO> {
    const url = `${this.baseUrl}/info`;
    return this.restService.restCall('GET', url);
  }

  public getAllUser(): Observable<UserDTO[]> {
    const url = `${this.baseUrl}`;
    return this.restService.restCall('GET', url);
  }

  public getUserById(id: number): Observable<UserDTO> {
    const url = `${this.baseUrl}/${id}`;
    return this.restService.restCall('GET', url);
  }

  public deleteUser(id: number): Observable<UserDTO> {
    const url = `${this.baseUrl}/${id}`;
    return this.restService.restCall('DELETE', url);
  }
}
