import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator-child',
  imports: [FormsModule],
  templateUrl: './calculator-child.html',
  styleUrl: './calculator-child.scss',
})
export class CalculatorChild {
  val1: number | null = null
  val2: number | null = null

  @Output() result = new EventEmitter<number>()

  sum() {
    if (this.val1 && this.val2) {
      const sumResult = Number(this.val1) + Number(this.val2)
      this.result.emit(sumResult)
    } else {
      throw new Error('error en la suma')
    }
  }
}
