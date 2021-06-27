import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationPregnancyComponent } from './calculation-pregnancy.component';

describe('CalculationPregnancyComponent', () => {
  let component: CalculationPregnancyComponent;
  let fixture: ComponentFixture<CalculationPregnancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculationPregnancyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationPregnancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
