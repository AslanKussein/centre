import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Util} from "../../service/util";
import {ConfigService} from "../../service/config.service";
import {AuthenticationService} from "../../service/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();

  constructor(private route: ActivatedRoute,
              private util: Util,
              private auth: AuthenticationService,
              private configService: ConfigService) {
    this.subscriptions.add(this.route.queryParams
      .subscribe(params => {
          if (!this.util.isNullOrEmpty(params)) {
            if (!this.util.isNullOrEmpty(params.access_token)) {
              this.auth.login(params.access_token);
            } else {
              // window.location.href = configService.ssoUrl
            }
            if (!this.util.isNullOrEmpty(params.lang)) {
              this.util.setItem('lang', params.lang);
            }
          }
        }
      ));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
