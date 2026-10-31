import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorFather } from './calculator-father';

describe('CalculatorFather', () => {
  let component: CalculatorFather;
  let fixture: ComponentFixture<CalculatorFather>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorFather]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorFather);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
