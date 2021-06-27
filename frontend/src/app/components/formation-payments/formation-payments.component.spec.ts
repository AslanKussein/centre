import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationPaymentsComponent } from './formation-payments.component';

describe('FormationPaymentsComponent', () => {
  let component: FormationPaymentsComponent;
  let fixture: ComponentFixture<FormationPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
