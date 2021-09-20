import {Component, OnDestroy, OnInit} from '@angular/core';
import {DictionaryService} from "../../service/dictionary.service";
import {Subscription} from "rxjs";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Util} from "../../service/util";
import {FormBuilder, Validators} from "@angular/forms";
import {PregnancyService} from "../../service/pregnancy.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-calculation-pregnancy',
  templateUrl: './calculation-pregnancy.component.html',
  styleUrls: ['./calculation-pregnancy.component.scss']
})
export class CalculationPregnancyComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();

  maxDate = new Date();
  pregnType!: any;
  pregnancyForm: any;

  constructor(private dicService: DictionaryService,
              private util: Util,
              private notification: NotificationService,
              private formBuilder: FormBuilder,
              private pregnancyService: PregnancyService,
              private ngxLoader: NgxUiLoaderService) {
  }

  ngOnInit(): void {
    this.ngxLoader.startBackground()
    this.pregnancyForm = this.formBuilder.group({
      dateTime: ['', Validators.required],
      branch: ['', Validators.required],
      level: ['', Validators.required],
      dicId: ['', Validators.required]
    });
    this.loadDic();
  }

  loadDic() {
    this.subscriptions.add(
      this.dicService.getRfspSinglePayments().subscribe(data => {
        this.pregnType = this.util.toSelectArrayNewDic(data);
      })
    )

    this.ngxLoader.stopBackground()
  }

  onOpenCalendar(container: any) {
    container.monthSelectHandler = (event: any): void => {
      if (event.date < new Date()) {
        container._store.dispatch(container._actions.select(event.date));
      }
    };
    container.setViewMode('month');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  callProc() {
    this.ngxLoader.start("master");

    this.subscriptions.add(
      this.pregnancyService.callProc(this.pregnancyForm).subscribe(res => {
        this.notification.showInfo(res.message, '');
        this.ngxLoader.stop("master");
      })
    )
  }
}
