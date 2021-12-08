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

  }

  ngOnInit(): void {
    console.log('********************************************')
    this.route.queryParams.subscribe(params => {
        console.log(params)

        this.auth.validate(params['access_token']);
        this.util.setItem('lang', params['lang']);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
