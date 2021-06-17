import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {NgxUiLoaderService} from "ngx-ui-loader";
import {PaymentDaysService} from "../../service/payment-days.service";
import {Subscription} from "rxjs";
import {formatDate} from '@angular/common';
import {NotificationService} from "../../service/notification.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Util} from "../../service/util";

@Component({
  selector: 'app-payment-days',
  templateUrl: './payment-days.component.html',
  styleUrls: ['./payment-days.component.scss']
})
export class PaymentDaysComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();

  constructor(private ngxLoader: NgxUiLoaderService,
              private notification: NotificationService,
              private modalService: BsModalService,
              public util: Util,
              private paymentDaysService: PaymentDaysService) {
  }

  maxDate = new Date();
  data: any;
  payMonth: any = new Date();
  modalRef!: BsModalRef;
  edData: any;

  ngOnInit(): void {
    this.getMaxPayMonth();
    this.getPaymentDays();
  }

  getMaxPayMonth() {
    this.ngxLoader.startBackground();

    this.subscriptions.add(
      this.paymentDaysService.getMaxPayMonth()
        .subscribe(res => {
          console.log(res.date);
        })
    )
    this.ngxLoader.stopBackground()
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
  }

  editData(data: any) {
    this.edData = data;
    this.edData.payDayChoose = new Date(data.payDay);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {backdrop: 'static', keyboard: false});
  }

  sendGraphicToEnpf(date: any) {
    this.ngxLoader.start("master");
    this.subscriptions.add(
      this.paymentDaysService.sendGraphicToEnpf(date)
        .subscribe(res => {
          this.notification.showInfo(res.message, '');
          this.ngxLoader.stop("master");
          this.getPaymentDays();
        })
    );
  }

  deletePayDay(date: any) {
    this.ngxLoader.start("master");
    this.subscriptions.add(
      this.paymentDaysService.deletePayDay(date)
        .subscribe(res => {
          this.notification.showInfo(res.message, '');
          this.ngxLoader.stop("master");
          this.getPaymentDays();
        })
    );
  }

  lockUnlockPayDay(date: any) {
    this.ngxLoader.start("master");
    this.subscriptions.add(
      this.paymentDaysService.lockUnlockPayDay(date)
        .subscribe(res => {
          this.notification.showInfo(res.message, '');
          this.ngxLoader.stop("master");
          this.getPaymentDays();
        })
    );
  }

  changeLevel(data: any) {
    this.ngxLoader.start("master");
    this.subscriptions.add(
      this.paymentDaysService.changeLevel(data)
        .subscribe(res => {
          this.notification.showInfo(res.message, '');
          this.ngxLoader.stop("master");
          this.getPaymentDays();
        })
    );
  }

  addNewPayDay(data: any) {
    this.ngxLoader.start("master");
    this.subscriptions.add(
      this.paymentDaysService.addNewPayDay(data)
        .subscribe(res => {
          this.notification.showInfo(res.message, '');
          this.ngxLoader.stop("master");
          this.getPaymentDays();
        })
    );
  }
}
