import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calculator-result',
  imports: [],
  templateUrl: './calculator-result.html',
  styleUrl: './calculator-result.scss',
})
export class CalculatorResult {
  @Input() result: number = 0
}
