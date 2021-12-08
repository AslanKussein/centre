import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';
import {ErrorInterceptor} from "./error.interceptor";
import {Util} from "../service/util";
import {AuthenticationService} from "../service/authentication.service";
import {ConfigService} from "../service/config.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private util: Util,
              private activatedRoute: ActivatedRoute,
              private configService: ConfigService,
              private errorInterceptor: ErrorInterceptor,
              private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const currentUser = this.authenticationService.currentUserValue
    if (currentUser) {
      return true
    } else {
      if (this.util.isNullOrEmpty(this.util.getItem('JWT_TOKEN'))) {
        // localStorage.clear();
        // window.location.href = this.configService.ssoUrl
        return;
      }
    }
  }
}
