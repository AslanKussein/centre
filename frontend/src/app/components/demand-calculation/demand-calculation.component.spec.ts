import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandCalculationComponent } from './demand-calculation.component';

describe('DemandCalculationComponent', () => {
  let component: DemandCalculationComponent;
  let fixture: ComponentFixture<DemandCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandCalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
