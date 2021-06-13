import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  env!: any;

  apiUrl = 'http://localhost:9090/centre/api';
  openApiUrl = 'http://localhost:9090/centre/open-api';
  authUrl = 'http://localhost:9090/centre/open-api/token/authUser';
  ssoUrl = 'http://localhost:8080/sso/';

  constructor() {
    if (environment.production) {
      this.apiUrl = '/centre/api';
      this.openApiUrl = '/centre/open-api';
      this.authUrl = '/centre/open-api/token/authUser';
      this.ssoUrl = 'http://172.16.17.86:8080/sso/';
    }
  }
}
