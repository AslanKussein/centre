import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {language} from "../environments/language";
import {AuthenticationService} from "./service/authentication.service";
import {User} from "./models/users";
import {BsLocaleService} from "ngx-bootstrap/datepicker";
import {NgSelectConfig} from "@ng-select/ng-select";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';
  _language = language;
  currentUser!: User;

  constructor(public translate: TranslateService,
              private authenticationService: AuthenticationService,
              private localeService: BsLocaleService,
              private config: NgSelectConfig) {
    translate.setDefaultLang(this._language.language)
    translate.use(this._language.language);
    this.localeService.use('ru');
    this.config.notFoundText = 'Данные не найдены';
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
}
