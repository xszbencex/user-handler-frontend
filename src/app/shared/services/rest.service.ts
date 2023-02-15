import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(protected http: HttpClient) {}

  public restCall(method: CallMethod, path: string, httpOptions: HttpOptions = {}): Observable<any> {
    if (httpOptions && !httpOptions.responseType) httpOptions.responseType = 'json';
    if (httpOptions && !httpOptions.observe) httpOptions.observe = 'body';

    return this.http.request(method, `${environment.backendUrl}${path}`, httpOptions);
  }
}

export type CallMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type HttpOptions = {
  body?: any;
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  reportProgress?: boolean;
  params?:
    | HttpParams
    | {
        [param: string]: string | number | boolean | readonly (string | number | boolean)[];
      };
  withCredentials?: boolean;
  observe?: 'body' | 'events' | 'response';
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
};
