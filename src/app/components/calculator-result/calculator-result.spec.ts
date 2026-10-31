import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorResult } from './calculator-result';

describe('CalculatorResult', () => {
  let component: CalculatorResult;
  let fixture: ComponentFixture<CalculatorResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
