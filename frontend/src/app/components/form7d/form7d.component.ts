import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Util} from "../../service/util";
import {DictionaryService} from "../../service/dictionary.service";

@Component({
  selector: 'app-form7d',
  templateUrl: './form7d.component.html',
  styleUrls: ['./form7d.component.scss']
})
export class Form7dComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  maxDate = new Date();
  paymentTypes!: any;

  constructor(private dictionaryService: DictionaryService,
              private util: Util) {
  }

  ngOnInit(): void {
    this.loadDics();
  }

  loadDics() {
    this.subscriptions.add(this.dictionaryService.getPaymentTypes().subscribe(data => {
      this.paymentTypes = this.util.toSelectArrayNewDic(data);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
