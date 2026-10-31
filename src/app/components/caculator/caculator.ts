import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-caculator',
  imports: [FormsModule],
  templateUrl: './caculator.html',
  styleUrl: './caculator.scss',
})
export class Caculator {
  result: number = 0
  val1: number | null = null
  val2: number | null = null
  
  add = () => { this.result = Number((Number(this.val1) + Number(this.val2)).toFixed(2))}
  minus = () => {this.result = Number((Number(this.val1) - Number(this.val2)).toFixed(2))}

  divide(): number {
    return this.result = Number((Number(this.val1) / Number(this.val2)).toFixed(2))
  }

  multiply(): number {
    return this.result = Number((Number(this.val1) * Number(this.val2)).toFixed(2))
  }

  potencia = () => {this.result = Number((Number(this.val1) ** Number(this.val2)).toFixed(2))}

  reset() {
    this.result = 0
    this.val1 = null
    this.val2 = null
  }
}
