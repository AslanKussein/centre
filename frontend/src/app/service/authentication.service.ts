import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {first, map, tap} from 'rxjs/operators';
import {ConfigService} from "./config.service";
import {User} from "../models/users";
import {Util} from "./util";
import {NotificationService} from "./notification.service";
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "./user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthenticationService implements OnDestroy {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private readonly REFRESH_TOKEN = 'refreshToken';
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  subscriptions: Subscription = new Subscription();

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
      .set('mode', 'no-cors')
  }

  constructor(private http: HttpClient,
              private configService: ConfigService,
              private util: Util,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private notifyService: NotificationService,
              public translate: TranslateService) {
    this.currentUserSubject = new BehaviorSubject<User>(this.util.getCurrentUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  update() {
    this.currentUserSubject = new BehaviorSubject<User>(this.util.getCurrentUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  validate(token: string) {
    this.options.headers.set('lang', <string>this.util.getItem('lang'));
    this.subscriptions.add(this.validateIDP(token)
      .pipe(first())
      .subscribe(
        param_ => {
          // this.subscriptions.add(this.userService.findUserByLogin().subscribe(data => {
          //   if (data != null) {
          //     param_.fullName = data.fullName
          //     param_.username = data.username
          //     param_.empId = data.empId
          //     param_.branch = data.branch
          //     localStorage.setItem('currentUser', JSON.stringify(param_));
          //     this.util.dnHref('/home')
          //   }
          // }));
        },
        res => {
          this.notifyService.showError('', res)
        }));
  }

  private validateIDP(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json')
    headers = headers.set('lang', <string>this.util.getItem('lang'));
    headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.post<any>(`${this.configService.ssoUrl}`.concat('open-api/auth/validateToken'), {token: token}, {headers: headers}).pipe(map(user => {
      if (user && user.accessToken) {
        this.storeTokens(user);
        this.util.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
    }));
  }

  refreshToken() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json')
    headers = headers.set('lang', <string>this.util.getItem('lang'));

    return this.http.post<any>(`${this.configService.ssoUrl}`.concat('open-api/auth/refreshToken'), {refreshToken: <string>this.getRefreshToken()}, {headers: headers})
      .pipe(tap((tokens: User) => {
        this.storeTokens(tokens);
      }));
  }

  logout() {
    try {
      this.subscriptions.add(this.signOut().pipe(first())
        .subscribe()
      )
    } finally {
      // @ts-ignore
      this.currentUserSubject.next(null);
      localStorage.clear();
      window.location.href = this.configService.ssoUrl
    }
  }

  signOut() {
    return this.http.post<any>(`${this.configService.apiUrl}`.concat('/token/logout'), {}, this.options)
      .pipe(tap(a => {
      }));
  }

  getJwtToken() {
    return this.util.getItem(this.JWT_TOKEN);
  }

  public storeTokens(tokens: User) {
    this.util.setItem(this.JWT_TOKEN, <string>tokens.accessToken);
    this.util.setItem(this.REFRESH_TOKEN, <string>tokens.refreshToken);
  }

  private getRefreshToken() {
    return this.util.getItem(this.REFRESH_TOKEN);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
