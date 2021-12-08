import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Subscription} from "rxjs";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {NotificationService} from "../../service/notification.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Util} from "../../service/util";
import {PaymentDaysService} from "../../service/payment-days.service";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-table-order',
  templateUrl: './table-order.component.html',
  styleUrls: ['./table-order.component.scss']
})
export class TableOrderComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();

  constructor(private ngxLoader: NgxUiLoaderService,
              private notification: NotificationService,
              public util: Util,
              private paymentDaysService: PaymentDaysService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
