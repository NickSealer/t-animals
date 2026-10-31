import { Component } from '@angular/core';
import { CalculatorChild } from "../calculator-child/calculator-child";
import { CalculatorResult } from "../calculator-result/calculator-result";

@Component({
  selector: 'app-calculator-father',
  imports: [CalculatorChild, CalculatorResult],
  templateUrl: './calculator-father.html',
  styleUrl: './calculator-father.scss',
})
export class CalculatorFather {
  result: number = 0

  getResult(result: number) {
    this.result = result
  }
}
