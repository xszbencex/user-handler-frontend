import { Injectable } from '@angular/core';
import { UserDTO } from '../models/UserDTO';
import { UserResponseDTO } from '../models/UserResponseDTO';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = '/user';

  constructor(private restService: RestService) {}

  public signIn(username: string, password: string): Observable<string> {
    const url = `${this.baseUrl}/authenticate`;
    return this.restService.restCall('POST', url, { params: { username, password }, responseType: 'text' });
  }

  public signUp(user: UserDTO): Observable<string> {
    const url = `${this.baseUrl}/signUp`;
    return this.restService.restCall('POST', url, { body: user, responseType: 'text' });
  }

  public getUserInfo(): Observable<UserResponseDTO> {
    const url = `${this.baseUrl}/info`;
    return this.restService.restCall('GET', url);
  }

  public getAllUser(): Observable<UserDTO[]> {
    const url = `${this.baseUrl}`;
    return this.restService.restCall('GET', url);
  }

  public updateUser(id: number, user: UserDTO): Observable<UserDTO> {
    const url = `${this.baseUrl}/${id}`;
    return this.restService.restCall('PUT', url, { body: user });
  }

  public deleteUser(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.restService.restCall('DELETE', url);
  }
}
