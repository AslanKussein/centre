import {Component, OnInit} from '@angular/core';
import {User} from "../../models/users";
import {AuthenticationService} from "../../service/authentication.service";
import {Util} from "../../service/util";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {ReportsService} from "../../service/reports.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser!: User;
  langValue!: string;
  repList!: any;

  constructor(private authenticationService: AuthenticationService,
              private translate: TranslateService,
              private reportsService: ReportsService,
              public util: Util) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.langValue = this.util.getLangValue();
    this.translate.use(<string>localStorage.getItem('lang'));

    this.getAllReportList();
  }

  onChange(event: any) {
    this.util.setItem('lang', event.target.id);
    this.translate.use(event.target.id);
    this.langValue = this.util.getLangValue();
  }

  getAllReportList() {
    this.reportsService.getAllReportList().subscribe(res => this.repList = res)
  }

  logout() {
    this.authenticationService.logout();
  }
}
