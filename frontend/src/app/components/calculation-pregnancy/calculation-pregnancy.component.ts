import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculation-pregnancy',
  templateUrl: './calculation-pregnancy.component.html',
  styleUrls: ['./calculation-pregnancy.component.scss']
})
export class CalculationPregnancyComponent implements OnInit {

  maxDate = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
