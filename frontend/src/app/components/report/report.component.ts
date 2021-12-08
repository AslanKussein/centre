import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReportsService} from "../../service/reports.service";
import {Subscription} from "rxjs";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  repList!: any;

  constructor(private reportsService: ReportsService,
              private ngxLoader: NgxUiLoaderService) {
  }

  ngOnInit(): void {
    this.getAllReportList();
  }

  getAllReportList() {
    this.ngxLoader.startBackground()
    this.subscriptions.add(
      this.reportsService.getAllReportList().subscribe(res => {
        this.repList = res;
        this.ngxLoader.stopBackground()
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
