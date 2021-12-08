import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Subscription} from "rxjs";
import {DemandCalcService} from "../../service/demand-calc.service";
import {Util} from "../../service/util";
import {AngularTreeGridComponent} from 'angular-tree-grid';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {formatDate} from "@angular/common";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-demand-calculation',
  templateUrl: './demand-calculation.component.html',
  styleUrls: ['./demand-calculation.component.scss']
})
export class DemandCalculationComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  data: any;
  payMonth: any = new Date();
  maxDate = new Date();
  @ViewChild('angularGrid', {static: true})
  angularGrid!: AngularTreeGridComponent;
  modalRef!: BsModalRef;
  selectedbranch!: any;
  formateDate!: any;

  constructor(private ngxLoader: NgxUiLoaderService,
              private util: Util,
              private notification: NotificationService,
              private modalService: BsModalService,
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

  onOpenCalendar(container: any) {
    container.monthSelectHandler = (event: any): void => {
      if (event.date < new Date()) {
        container._store.dispatch(container._actions.select(event.date));
      }
    };
    container.setViewMode('month');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {backdrop: 'static', keyboard: false});
  }

  configs: any = {
    id_field: 'id',
    parent_id_field: 'parent',
    parent_display_field: 'name',
    css: {
      expand_class: 'fa fa-plus',
      collapse_class: 'fa fa-minus',
    },
    columns: [
      {
        name: 'id',
        header: 'Код',
        width: 100
      },
      {
        name: 'name',
        header: 'Наименование',
        width: 910
      },
      {
        name: 'statusLock',
        header: 'Блокировка',
        width: '25%'
      },
      {
        name: 'statusCalc',
        header: 'Расчет',
        width: '25%'
      }
    ]
  };

  selectCol(e: any) {
    this.selectedbranch = e.row.id;
    this.formateDate = formatDate(this.payMonth, 'MM.YYYY', 'en-US');
  }

  estimateNeed() {
    this.ngxLoader.startBackground();
    this.subscriptions.add(
      this.demandCalcService.estimateNeed(this.selectedbranch, this.formateDate)
        .subscribe(res => {
          this.notification.showInfo(res.message, '');
          this.ngxLoader.stopBackground();
        }, error => {
          this.ngxLoader.stopBackground();
          this.notification.showWarning(error.error.message, '');
        })
    )
  }
}
