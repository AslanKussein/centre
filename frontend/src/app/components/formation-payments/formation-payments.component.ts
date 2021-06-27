import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-formation-payments',
  templateUrl: './formation-payments.component.html',
  styleUrls: ['./formation-payments.component.scss']
})
export class FormationPaymentsComponent implements OnInit {

  maxDate = new Date();
  regions!: any;
  selectedTab: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

  selectTab(id: number) {
    this.selectedTab = id;
  }
}
