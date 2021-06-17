import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form7dComponent } from './form7d.component';

describe('Form7dComponent', () => {
  let component: Form7dComponent;
  let fixture: ComponentFixture<Form7dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form7dComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Form7dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
