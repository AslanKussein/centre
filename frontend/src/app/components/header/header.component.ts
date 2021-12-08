import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {User} from "../../models/users";
import {AuthenticationService} from "../../service/authentication.service";
import {Util} from "../../service/util";
import {TranslateService} from "@ngx-translate/core";
import {ReportsService} from "../../service/reports.service";
import {Subscription} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  currentUser!: User;
  langValue!: string;
  repList!: any;
  repParList!: any;
  modalRef!: BsModalRef;
  reportName: any;
  appForm!: FormGroup;

  constructor(private authenticationService: AuthenticationService,
              private translate: TranslateService,
              private reportsService: ReportsService,
              public util: Util,
              private ngxLoader: NgxUiLoaderService,
              private notification: NotificationService,
              private modalService: BsModalService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.langValue = this.util.getLangValue();
    this.translate.use(<string>localStorage.getItem('lang'));
    this.appForm = new FormGroup({
      repId: new FormControl(null, Validators.required)
    });
    this.getAllReportList();
  }

  onChange(event: any) {
    this.util.setItem('lang', event.target.id);
    this.translate.use(event.target.id);
    this.langValue = this.util.getLangValue();
  }

  getAllReportList() {
    this.subscriptions.add(this.reportsService.getAllReportList().subscribe(res => this.repList = res));
  }

  logout() {
    this.authenticationService.logout();
  }

  getRepParam(repData: any) {
    this.reportName = repData.nameRu;
    this.appForm.controls.repId.setValue(repData.id);
    this.subscriptions.add(this.reportsService.getRepParam(repData.id).subscribe(res => {
      this.repParList = res
      // @ts-ignore
      res.forEach(f => {
        this.appForm.addControl(f.formName, new FormControl('', Validators.nullValidator));
      })
    }));
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-dialog modal-lg'
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  submit() {
    this.ngxLoader.startBackground();
    this.subscriptions.add(this.reportsService.createOrder(this.appForm.getRawValue())
      .subscribe(res => {
        this.notification.showInfo(res.message, '');
        this.ngxLoader.stopBackground();
      }, error => {
        this.ngxLoader.stopBackground();
        this.notification.showWarning(error.error.message, '');
      })
    );
  }
}
