import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorChild } from './calculator-child';

describe('CalculatorChild', () => {
  let component: CalculatorChild;
  let fixture: ComponentFixture<CalculatorChild>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorChild]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorChild);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
