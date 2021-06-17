import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Subscription} from "rxjs";
import {DemandCalcService} from "../../service/demand-calc.service";
import {Util} from "../../service/util";
import {AngularTreeGridComponent} from 'angular-tree-grid';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {formatDate} from "@angular/common";

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

  datax = [{
    "id": "01",
    "parent": "0",
    "name": "Акмолинская",
    "nameKz": "Ақмола облысы",
    "statusLock": null,
    "statusCalc": null
  }, {
    "id": "02",
    "parent": "0",
    "name": "Актюбинская",
    "nameKz": "Ақтөбе облысы ",
    "statusLock": null,
    "statusCalc": null
  }, {
    "id": "03",
    "parent": "0",
    "name": "Алматинская",
    "nameKz": "Алматы облысы ",
    "statusLock": null,
    "statusCalc": null
  }, {
    "id": "04",
    "parent": "0",
    "name": "Атырауская",
    "nameKz": "Атырау облысы ",
    "statusLock": null,
    "statusCalc": null
  }, {
    "id": "05",
    "parent": "0",
    "name": "Восточно-Казахстанская",
    "nameKz": "Шығыс Қазақстан облысы ",
    "statusLock": null,
    "statusCalc": null
  }, {
    "id": "06",
    "parent": "0",
    "name": "Жамбылская",
    "nameKz": "Жамбыл облысы ",
    "statusLock": null,
    "statusCalc": null
  }, {
    "id": "07",
    "parent": "0",
    "name": "Западно-Казахстанская",
    "nameKz": "Батыс Қазақстан облысы ",
    "statusLock": null,
    "statusCalc": null
  }, {
    "id": "08",
    "parent": "0",
    "name": "Карагандинская",
    "nameKz": "Қарағанды облысы ",
    "statusLock": null,
    "statusCalc": null
  }, {
    "id": "09",
    "parent": "0",
    "name": "Кызылординская",
    "nameKz": "Қызылорда облысы ",
    "statusLock": null,
    "statusCalc": null
  }, {
    "id": "10",
    "parent": "0",
    "name": "Костанайская",
    "nameKz": "Қостанай облысы ",
    "statusLock": null,
    "statusCalc": null
  }, {
    "id": "11",
    "parent": "0",
    "name": "Мангистауская",
    "nameKz": "Манғыстау облысы ",
    "statusLock": null,
    "statusCalc": null
  }, {
    "id": "12",
    "parent": "0",
    "name": "Павлодарская",
    "nameKz": "Павлодар облысы ",
    "statusLock": null,
    "statusCalc": null
  }, {
    "id": "13",
    "parent": "0",
    "name": "Северо-Казахстанская",
    "nameKz": "Солтүстік-Қазақстан облысы ",
    "statusLock": null,
    "statusCalc": null
  }, {
    "id": "14",
    "parent": "0",
    "name": "Туркестанская ",
    "nameKz": "Түркістан облысы ",
    "statusLock": null,
    "statusCalc": null
  }, {
    "id": "15",
    "parent": "0",
    "name": "г. Алматы",
    "nameKz": "Алматы қаласы ",
    "statusLock": null,
    "statusCalc": null
  }, {
    "id": "16",
    "parent": "0",
    "name": "г. Нур-Султан",
    "nameKz": "Нур-Султан қаласы ",
    "statusLock": null,
    "statusCalc": null
  }, {
    "id": "17",
    "parent": "0",
    "name": "г. Шымкент",
    "nameKz": "Шымкент қаласы",
    "statusLock": null,
    "statusCalc": null
  }, {
    "id": "1507",
    "parent": "15",
    "name": "г.Алматы Алатауское отделение",
    "nameKz": "Алматы Алатау",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1702",
    "parent": "17",
    "name": "Шымкентское гор.отд.Аль-Фараб",
    "nameKz": "Шымкент Аль-Фар",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1703",
    "parent": "17",
    "name": "Шымкентское гор.отд.Енбекши",
    "nameKz": "Шымкент Енбекши",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1704",
    "parent": "17",
    "name": "Шымкентское гор.отд.Каратау",
    "nameKz": "Шымкент Каратау",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1509",
    "parent": "15",
    "name": "г.Алматы Наурызбайское отд.",
    "nameKz": "Алматы Наурызба",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1419",
    "parent": "14",
    "name": "Келесское районное отделение",
    "nameKz": "Келес",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1604",
    "parent": "16",
    "name": "г. Нур-Султан Байконырское",
    "nameKz": "г. Астана Байк",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1700",
    "parent": "17",
    "name": "г. Шымкент",
    "nameKz": "г. Шымкент",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1422",
    "parent": "14",
    "name": "Махтааральское Асык-Ата",
    "nameKz": "Асык-Ата",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1421",
    "parent": "14",
    "name": "Махтааральское Мырзакент",
    "nameKz": "Мырзакент",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1420",
    "parent": "14",
    "name": "Махтааральское Атакент",
    "nameKz": "Атакент",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0321",
    "parent": "03",
    "name": "Кегенское",
    "nameKz": "Кеген",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0100",
    "parent": "01",
    "name": "Акмолинская область",
    "nameKz": "Акмолинская обл",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0102",
    "parent": "01",
    "name": "Степногорск",
    "nameKz": "г.Степногорск",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0103",
    "parent": "01",
    "name": "Акколь",
    "nameKz": "Акколь",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0104",
    "parent": "01",
    "name": "Астраханка",
    "nameKz": "Астраханское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0105",
    "parent": "01",
    "name": "Атбасар",
    "nameKz": "Атбасар",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0106",
    "parent": "01",
    "name": "Сандыктау",
    "nameKz": "Сандыктау",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0107",
    "parent": "01",
    "name": "Аршалы",
    "nameKz": "Аршалы",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0108",
    "parent": "01",
    "name": "Жаркаин",
    "nameKz": "Жаркаин",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0109",
    "parent": "01",
    "name": "Ерейментау",
    "nameKz": "Ерейментау",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0110",
    "parent": "01",
    "name": "Есиль",
    "nameKz": "Есильское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0111",
    "parent": "01",
    "name": "Жаксы",
    "nameKz": "Жаксынское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0112",
    "parent": "01",
    "name": "Егиндыколь",
    "nameKz": "Егиндыколь",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0113",
    "parent": "01",
    "name": "Коргалжынск",
    "nameKz": "Коргалжын",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0114",
    "parent": "01",
    "name": "Буланды",
    "nameKz": "Буланды",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0115",
    "parent": "01",
    "name": "Целиноградское ",
    "nameKz": "Целиноградское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0116",
    "parent": "01",
    "name": "Шортанды",
    "nameKz": "Шортанды",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0117",
    "parent": "01",
    "name": "Кокшетау",
    "nameKz": "г.Кокшетау",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0118",
    "parent": "01",
    "name": "Бурабай",
    "nameKz": "Бурабай",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0119",
    "parent": "01",
    "name": "Биржан сал",
    "nameKz": "Биржан сал",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0120",
    "parent": "01",
    "name": "Зерендинское",
    "nameKz": "Зеренда",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0200",
    "parent": "02",
    "name": "Актюбинская область",
    "nameKz": "Актюбинская обл",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0201",
    "parent": "02",
    "name": " Актюбинск",
    "nameKz": "г.Актюбинск",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0202",
    "parent": "02",
    "name": "Алгинское ",
    "nameKz": "Алгинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0203",
    "parent": "02",
    "name": "Айтекебийское ",
    "nameKz": "Айтекеби",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0204",
    "parent": "02",
    "name": "Байганинское",
    "nameKz": "Байганинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0205",
    "parent": "02",
    "name": "Иргизское ",
    "nameKz": "Иргизское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0206",
    "parent": "02",
    "name": "Мартукское ",
    "nameKz": "Мартукское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0207",
    "parent": "02",
    "name": "Мугалжарское ",
    "nameKz": "Мугалжарское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0208",
    "parent": "02",
    "name": "Каргалинское ",
    "nameKz": "Каргалинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0209",
    "parent": "02",
    "name": "Темирское ",
    "nameKz": "Темирское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0210",
    "parent": "02",
    "name": "Уилское ",
    "nameKz": "Уилское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0211",
    "parent": "02",
    "name": "Хобдинское ",
    "nameKz": "Хобдинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0212",
    "parent": "02",
    "name": "Хромтауское",
    "nameKz": "Хромтау",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0213",
    "parent": "02",
    "name": "Шалкарское ",
    "nameKz": "Шалкар",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0300",
    "parent": "03",
    "name": "Алматинская область",
    "nameKz": "Алматинская обл",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0302",
    "parent": "03",
    "name": "Капчагай",
    "nameKz": "Капчагай",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0303",
    "parent": "03",
    "name": "Талдыкорган",
    "nameKz": "г.Талдыкорган",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0304",
    "parent": "03",
    "name": "Текелинское",
    "nameKz": "Текели",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0305",
    "parent": "03",
    "name": "Аксуское",
    "nameKz": "Аксу",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0306",
    "parent": "03",
    "name": "Алакольское ",
    "nameKz": "Алаколь",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0307",
    "parent": "03",
    "name": "Балхашское ",
    "nameKz": "Балхаш",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0308",
    "parent": "03",
    "name": "Енбекшиказахское ",
    "nameKz": "Енбекшиказахск.",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0309",
    "parent": "03",
    "name": "Жамбылское",
    "nameKz": "Жамбылское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0310",
    "parent": "03",
    "name": "Илийское",
    "nameKz": "Илийское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0311",
    "parent": "03",
    "name": "Каратальское ",
    "nameKz": "Каратал",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0312",
    "parent": "03",
    "name": "Карасайское ",
    "nameKz": "Карасай",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0313",
    "parent": "03",
    "name": "Кербулакское ",
    "nameKz": "Кербулак",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0314",
    "parent": "03",
    "name": "Коксуское ",
    "nameKz": "Коксу",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0315",
    "parent": "03",
    "name": "Панфиловское ",
    "nameKz": "Панфиловское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0316",
    "parent": "03",
    "name": "Райымбекское ",
    "nameKz": "Райымбек",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0317",
    "parent": "03",
    "name": "Саркандское ",
    "nameKz": "Саркандское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0318",
    "parent": "03",
    "name": "Ескельдинское ",
    "nameKz": "Ескельдинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0319",
    "parent": "03",
    "name": "Талгарское ",
    "nameKz": "Талгарское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0320",
    "parent": "03",
    "name": "Уйгурское ",
    "nameKz": "Уйгурское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0400",
    "parent": "04",
    "name": "Атырауская область",
    "nameKz": "Атырауская обл",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0401",
    "parent": "04",
    "name": "Атырау",
    "nameKz": "г.Атырау",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0402",
    "parent": "04",
    "name": "Индерское ",
    "nameKz": "Индерское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0403",
    "parent": "04",
    "name": "Исатайское ",
    "nameKz": "Исатайское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0404",
    "parent": "04",
    "name": "Жылыойское ",
    "nameKz": "Жылыойское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0405",
    "parent": "04",
    "name": "Курмангазинское ",
    "nameKz": "Курмангазы",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0406",
    "parent": "04",
    "name": "Кызылкогинское",
    "nameKz": "Кзылкоги",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0407",
    "parent": "04",
    "name": "Макатское ",
    "nameKz": "Макатское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0408",
    "parent": "04",
    "name": "Махамбетское ",
    "nameKz": "Махамбетское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0500",
    "parent": "05",
    "name": "Восточно-Казахстанская область",
    "nameKz": "Вост-Казахст.об",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0501",
    "parent": "05",
    "name": "Риддер",
    "nameKz": "г. Риддер",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0502",
    "parent": "05",
    "name": "г. Усть-Каменогорск",
    "nameKz": "Усть-Каменогор.",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0503",
    "parent": "05",
    "name": "Курчатов",
    "nameKz": "г.Курчатов",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0504",
    "parent": "05",
    "name": "Семей",
    "nameKz": "г.Семей",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0505",
    "parent": "05",
    "name": "Абайское ",
    "nameKz": "Абайское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0506",
    "parent": "05",
    "name": "Аягузское",
    "nameKz": "Аягузское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0507",
    "parent": "05",
    "name": "Бескарагайское",
    "nameKz": "Бескарагай",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0508",
    "parent": "05",
    "name": "Бородулихинское",
    "nameKz": "Бородулиха",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0509",
    "parent": "05",
    "name": "Глубоковское ",
    "nameKz": "Глубоковское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0510",
    "parent": "05",
    "name": "Жарминское ",
    "nameKz": "Жарминское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0511",
    "parent": "05",
    "name": "Зайсанское",
    "nameKz": "Зайсан",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0512",
    "parent": "05",
    "name": "Алтайское",
    "nameKz": "Алтай",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0513",
    "parent": "05",
    "name": "Катон-Карагайское ",
    "nameKz": "Катон-Карагай",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0514",
    "parent": "05",
    "name": " Кокпектинское ",
    "nameKz": "Кокпекты",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0515",
    "parent": "05",
    "name": " Курчумское ",
    "nameKz": "Курчумское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0516",
    "parent": "05",
    "name": "Тарбагатайское ",
    "nameKz": "Тарбагатайское ",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0517",
    "parent": "05",
    "name": "Уланское ",
    "nameKz": "Уланское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0518",
    "parent": "05",
    "name": "Урджарское ",
    "nameKz": "Урджарское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0519",
    "parent": "05",
    "name": "Шемонаихинское ",
    "nameKz": "Шемонаихинское ",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0600",
    "parent": "06",
    "name": "Жамбылская область",
    "nameKz": "Жамбылская обл",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0601",
    "parent": "06",
    "name": "Тараз",
    "nameKz": "г.Тараз",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0602",
    "parent": "06",
    "name": "Байзакское",
    "nameKz": "Байзакское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0603",
    "parent": "06",
    "name": "Жамбылское ",
    "nameKz": "Жамбылское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0604",
    "parent": "06",
    "name": "Жуалынское ",
    "nameKz": "Жуалынское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0605",
    "parent": "06",
    "name": "Кордайское ",
    "nameKz": "Кордайское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0606",
    "parent": "06",
    "name": "им. Т.Рыскулова",
    "nameKz": "Т.Рыскулова",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0607",
    "parent": "06",
    "name": "Меркенское ",
    "nameKz": "Меркенское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0608",
    "parent": "06",
    "name": "Мойынкумское ",
    "nameKz": "Мойынкумское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0609",
    "parent": "06",
    "name": "Сарысуское ",
    "nameKz": "Сарысуское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0610",
    "parent": "06",
    "name": "Таласское ",
    "nameKz": "Таласское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0611",
    "parent": "06",
    "name": "Шуское ",
    "nameKz": "Шуское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0700",
    "parent": "07",
    "name": "Западно-Казахстанская область",
    "nameKz": "Западно-Казахст",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0701",
    "parent": "07",
    "name": "Уральск",
    "nameKz": "г.Уральск",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0702",
    "parent": "07",
    "name": "Акжаикское",
    "nameKz": "Акжаикское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0703",
    "parent": "07",
    "name": "Бурлинское",
    "nameKz": "Бурлинск",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0704",
    "parent": "07",
    "name": "Жангалинское ",
    "nameKz": "Джангалинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0705",
    "parent": "07",
    "name": "Жаныбекское",
    "nameKz": "Джаныбекское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0706",
    "parent": "07",
    "name": "Байтерекское",
    "nameKz": "Байтерекское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0707",
    "parent": "07",
    "name": "Казталовское",
    "nameKz": "Казталовское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0708",
    "parent": "07",
    "name": "Каратобинское ",
    "nameKz": "Каратобе",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0709",
    "parent": "07",
    "name": "Сырымское ",
    "nameKz": "Срымское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0710",
    "parent": "07",
    "name": "Таскалинское ",
    "nameKz": "Таскалинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0711",
    "parent": "07",
    "name": "Теректинское",
    "nameKz": "Теректы",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0712",
    "parent": "07",
    "name": "Бокейординское",
    "nameKz": "Урдинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0713",
    "parent": "07",
    "name": "Чингирлауское ",
    "nameKz": "Чингирлауское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0800",
    "parent": "08",
    "name": "Карагандинская область",
    "nameKz": "Карагандинская ",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0801",
    "parent": "08",
    "name": "Балхаш",
    "nameKz": "г.Балхаш",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0802",
    "parent": "08",
    "name": "Жезказган",
    "nameKz": "г.Жезказган",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0803",
    "parent": "08",
    "name": "Караганда",
    "nameKz": "г.Караганда",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0804",
    "parent": "08",
    "name": "Каражалское ",
    "nameKz": "Каражал",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0805",
    "parent": "08",
    "name": "Приозерск",
    "nameKz": "Приозерск",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0806",
    "parent": "08",
    "name": "Сараньское ",
    "nameKz": "Сарань",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0807",
    "parent": "08",
    "name": "Темиртау",
    "nameKz": "Темиртау",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0808",
    "parent": "08",
    "name": "Шахтинск",
    "nameKz": "Шахтинск",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0809",
    "parent": "08",
    "name": "Абайское ",
    "nameKz": "Абайское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0810",
    "parent": "08",
    "name": "Актогайское ",
    "nameKz": "Актогай",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0811",
    "parent": "08",
    "name": "Бухар-Жырауское ",
    "nameKz": "Бухар-Жырауское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0812",
    "parent": "08",
    "name": "Жанааркинское ",
    "nameKz": "Жанааркинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0813",
    "parent": "08",
    "name": "Каркаралинское ",
    "nameKz": "Каркаралинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0814",
    "parent": "08",
    "name": "Нуринское ",
    "nameKz": "Нуринское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0815",
    "parent": "08",
    "name": "Осакаровское ",
    "nameKz": "Осакаровское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0816",
    "parent": "08",
    "name": "Улытауское",
    "nameKz": "Улытау",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0817",
    "parent": "08",
    "name": "Шетское",
    "nameKz": "Шетское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0818",
    "parent": "08",
    "name": "Сатпаев",
    "nameKz": "Сатпаев",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0900",
    "parent": "09",
    "name": "Кызылординская область",
    "nameKz": "Кызылординская ",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0901",
    "parent": "09",
    "name": "Кызылорда",
    "nameKz": "г.Кызыл-Орда",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0902",
    "parent": "09",
    "name": "г.Байконур",
    "nameKz": "г.Байконур",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0903",
    "parent": "09",
    "name": "Аральское ",
    "nameKz": "Аральское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0904",
    "parent": "09",
    "name": "Жалагашское ",
    "nameKz": "Жалагашское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0905",
    "parent": "09",
    "name": "Жанакорганское ",
    "nameKz": "Жанакорганское ",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0906",
    "parent": "09",
    "name": "Казалинское ",
    "nameKz": "Казалинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0907",
    "parent": "09",
    "name": "Кармакчинское ",
    "nameKz": "Кармакшы",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0908",
    "parent": "09",
    "name": "Сырдарьинское ",
    "nameKz": "Сырдарьинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "0909",
    "parent": "09",
    "name": "Шиелийское ",
    "nameKz": "Шиелийское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1000",
    "parent": "10",
    "name": "Костанайская область",
    "nameKz": "Костанайская ",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1001",
    "parent": "10",
    "name": "Аркалык",
    "nameKz": "Аркалык",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1002",
    "parent": "10",
    "name": "Костанай",
    "nameKz": "г.Костанай",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1003",
    "parent": "10",
    "name": "Лисаковск",
    "nameKz": "г.Лисаковск",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1004",
    "parent": "10",
    "name": "Рудный",
    "nameKz": "г.Рудный",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1005",
    "parent": "10",
    "name": "Алтынсаринское ",
    "nameKz": "Алтынсаринское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1006",
    "parent": "10",
    "name": "Амангельдинское ",
    "nameKz": "Амангельдинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1007",
    "parent": "10",
    "name": "Аулиекольское ",
    "nameKz": "Аулиекольское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1008",
    "parent": "10",
    "name": "Денисовское ",
    "nameKz": "Денисовское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1009",
    "parent": "10",
    "name": "Жангильдинское ",
    "nameKz": "Жангильдинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1010",
    "parent": "10",
    "name": "Житикаринское",
    "nameKz": "Житикаринское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1011",
    "parent": "10",
    "name": "Камыстинское",
    "nameKz": "Камыстинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1012",
    "parent": "10",
    "name": "Карасуское ",
    "nameKz": "Карасуское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1013",
    "parent": "10",
    "name": "Карабалыкское ",
    "nameKz": "Карабалыкское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1014",
    "parent": "10",
    "name": "Костанайское",
    "nameKz": "Костанайское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1015",
    "parent": "10",
    "name": "Мендыкаринское",
    "nameKz": "Мендыкаринское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1016",
    "parent": "10",
    "name": "Наурзумское ",
    "nameKz": "Наурзумское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1017",
    "parent": "10",
    "name": "Сарыкольское ",
    "nameKz": "Сарыкольское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1018",
    "parent": "10",
    "name": "Тарановское ",
    "nameKz": "Тарановское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1019",
    "parent": "10",
    "name": "Узункольское ",
    "nameKz": "Узункольское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1020",
    "parent": "10",
    "name": "Федоровское ",
    "nameKz": "Федоровское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1100",
    "parent": "11",
    "name": "Мангистауская область",
    "nameKz": "Мангистауская ",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1101",
    "parent": "11",
    "name": "Актау",
    "nameKz": "г.Актау",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1102",
    "parent": "11",
    "name": "Жанаозен",
    "nameKz": "Жанаозенское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1103",
    "parent": "11",
    "name": "Бейнеуское",
    "nameKz": "Бейнеуское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1104",
    "parent": "11",
    "name": "Мангистауское ",
    "nameKz": "Мангистауское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1105",
    "parent": "11",
    "name": "Каракиянское ",
    "nameKz": "Каракиянское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1106",
    "parent": "11",
    "name": "Тупкараганское ",
    "nameKz": "Тупкараганское ",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1200",
    "parent": "12",
    "name": "Павлодарская область",
    "nameKz": "Павлодарская ",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1201",
    "parent": "12",
    "name": "Аксу",
    "nameKz": "г.Аксу",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1202",
    "parent": "12",
    "name": "Павлодар",
    "nameKz": "г.Павлодар",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1203",
    "parent": "12",
    "name": "Экибастуз",
    "nameKz": "г.Экибастуз",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1204",
    "parent": "12",
    "name": "Актогайское ",
    "nameKz": "Актогайское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1205",
    "parent": "12",
    "name": "Баянаульское ",
    "nameKz": "Баянаульское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1206",
    "parent": "12",
    "name": "Железинское ",
    "nameKz": "Железинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1207",
    "parent": "12",
    "name": "Иртышское",
    "nameKz": "Иртышское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1208",
    "parent": "12",
    "name": "Теренкольское",
    "nameKz": "Тереңкөл",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1209",
    "parent": "12",
    "name": "Аккулуское",
    "nameKz": "Аққулы",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1210",
    "parent": "12",
    "name": "Майское ",
    "nameKz": "Майское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1211",
    "parent": "12",
    "name": "Павлодарское ",
    "nameKz": "Павлодарское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1212",
    "parent": "12",
    "name": "Успенское ",
    "nameKz": "Успенское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1213",
    "parent": "12",
    "name": "Щербактинское ",
    "nameKz": "Щербактинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1300",
    "parent": "13",
    "name": "Северо-Казахстанская область",
    "nameKz": "Северо-Казахст.",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1301",
    "parent": "13",
    "name": "Петропавловск",
    "nameKz": "г.Петропавловск",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1304",
    "parent": "13",
    "name": "Айыртауское ",
    "nameKz": "Айыртауское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1305",
    "parent": "13",
    "name": "Акжарское ",
    "nameKz": "Акжарское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1306",
    "parent": "13",
    "name": "районное отделение М.Жумабаева",
    "nameKz": "М.Жумабаева ",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1308",
    "parent": "13",
    "name": "Есильское ",
    "nameKz": "Есильское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1309",
    "parent": "13",
    "name": "Жамбылское ",
    "nameKz": "Жамбылское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1311",
    "parent": "13",
    "name": "Кызылжарское ",
    "nameKz": "Кызылжарское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1312",
    "parent": "13",
    "name": "Мамлютское ",
    "nameKz": "Мамлютское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1313",
    "parent": "13",
    "name": "Шал Акын ",
    "nameKz": "Шал Акынское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1314",
    "parent": "13",
    "name": "Аккайынское",
    "nameKz": "Аккайынское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1315",
    "parent": "13",
    "name": "Тайыншинское ",
    "nameKz": "Тайыншинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1316",
    "parent": "13",
    "name": "Тимирязевское ",
    "nameKz": "Тимирязевское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1317",
    "parent": "13",
    "name": "Уалихановское",
    "nameKz": "Уалихановское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1318",
    "parent": "13",
    "name": "им.Г. Мусрепова",
    "nameKz": "Г. Мусрепова",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1400",
    "parent": "14",
    "name": "Туркестанская область",
    "nameKz": "Туркестан. обл.",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1401",
    "parent": "14",
    "name": "Кентау",
    "nameKz": "Кентауское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1402",
    "parent": "14",
    "name": "Туркестан",
    "nameKz": "Туркестанское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1701",
    "parent": "17",
    "name": "Шымкентское гор.отд.Абай",
    "nameKz": "Шымкент Абай",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1404",
    "parent": "14",
    "name": "Байдибекское ",
    "nameKz": "Байдибекское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1405",
    "parent": "14",
    "name": "Казгуртское ",
    "nameKz": "Казгуртское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1406",
    "parent": "14",
    "name": "Махтааральское Жетисай",
    "nameKz": "Жетисай",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1407",
    "parent": "14",
    "name": "Ордабасинское ",
    "nameKz": "Ордабасинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1408",
    "parent": "14",
    "name": "Отрарское ",
    "nameKz": "Отрарское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1409",
    "parent": "14",
    "name": "Сайрамское ",
    "nameKz": "Сайрамское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1410",
    "parent": "14",
    "name": "Сарыагашское г.Сарыагаш",
    "nameKz": "г.Сарыагаш",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1411",
    "parent": "14",
    "name": "Сузакское ",
    "nameKz": "Сузакское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1412",
    "parent": "14",
    "name": "Толебийское ",
    "nameKz": "Толебийское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1413",
    "parent": "14",
    "name": "Тюлькубасское ",
    "nameKz": "Тюлькубасское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1414",
    "parent": "14",
    "name": "Шардаринское ",
    "nameKz": "Шардаринское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1415",
    "parent": "14",
    "name": "Арысское",
    "nameKz": "Арысское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1500",
    "parent": "15",
    "name": "г. Алматы",
    "nameKz": "г. Алматы",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1501",
    "parent": "15",
    "name": "г. Алматы Алмалинское",
    "nameKz": "Алматы Алмалин",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1502",
    "parent": "15",
    "name": "г. Алматы Ауэзовское",
    "nameKz": "Алматы Ауэзовск",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1503",
    "parent": "15",
    "name": "г. Алматы Бостандыкское",
    "nameKz": "Алматы Бостанды",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1504",
    "parent": "15",
    "name": "г. Алматы Жетысуйское",
    "nameKz": "Алматы Жетысу",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1505",
    "parent": "15",
    "name": "г.Алматы Медеуское отделение",
    "nameKz": "Алматы Медеу",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1506",
    "parent": "15",
    "name": "г.Алматы Турксибское отделение",
    "nameKz": "Алматы Турксибс",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1600",
    "parent": "16",
    "name": "г.Нур-Султан",
    "nameKz": "г.Астана",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1602",
    "parent": "16",
    "name": "г. Нур-Султан Сарыаркинское",
    "nameKz": "г. Астана Сары",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1603",
    "parent": "16",
    "name": "г. Нур-Султан Есильское",
    "nameKz": "г. Астана Есиль",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1601",
    "parent": "16",
    "name": "г. Нур-Султан Алматинское",
    "nameKz": "г. Астана Алмат",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }, {
    "id": "1107",
    "parent": "11",
    "name": "Мунайлинское",
    "nameKz": "Мунайлинское",
    "statusLock": "Разблокирован",
    "statusCalc": "Не рассчитан"
  }]

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
}
