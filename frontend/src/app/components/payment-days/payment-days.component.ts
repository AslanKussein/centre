import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgxUiLoaderService} from "ngx-ui-loader";
import {PaymentDaysService} from "../../service/payment-days.service";
import {Subscription} from "rxjs";
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-payment-days',
  templateUrl: './payment-days.component.html',
  styleUrls: ['./payment-days.component.scss']
})
export class PaymentDaysComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();

  constructor(private ngxLoader: NgxUiLoaderService,
              private paymentDaysService: PaymentDaysService) {
  }

  maxDate = new Date();
  data: any;
  payMonth: any = new Date();

  ngOnInit(): void {
    this.getPaymentDays();
  }

  getPaymentDays() {
    this.ngxLoader.startBackground();

    this.subscriptions.add(
      this.paymentDaysService.getPaymentDays(this.payMonth)
        .subscribe(res => {
          this.data = res;
        })
    )
    this.ngxLoader.stopBackground()
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onOpenCalendar(container: any) {
    container.monthSelectHandler = (event: any): void => {
      if (event.date < new Date()) {
        container._store.dispatch(container._actions.select(event.date));
        this.getPaymentDays();
      }
    };
    container.setViewMode('month');
  }

  formatDate(claim: any) {
    return formatDate(claim.payDay, 'yyyy-MM-dd HH:mm:ss', 'en-US');
    // return formatDate(claim.payDay, 'dd.MM.yyyy HH:mm', 'en-US');
  }
}
