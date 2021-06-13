import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Subscription} from "rxjs";
import {DemandCalcService} from "../../service/demand-calc.service";
import {Util} from "../../service/util";

@Component({
  selector: 'app-demand-calculation',
  templateUrl: './demand-calculation.component.html',
  styleUrls: ['./demand-calculation.component.scss']
})
export class DemandCalculationComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  data: any;

  constructor(private ngxLoader: NgxUiLoaderService,
              private util: Util,
              private demandCalcService: DemandCalcService) {
  }

  ngOnInit(): void {
    this.getCalcData();
  }

  getCalcData() {
    this.ngxLoader.startBackground();

    this.subscriptions.add(
      this.demandCalcService.getCalcData()
        .subscribe(res => {
          this.data = res;
        })
    )
    this.ngxLoader.stopBackground()
  }

  dicLang(data: any) {
    return this.util.getItem('lang') == 'kz' ? data.nameKz : data.name;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
