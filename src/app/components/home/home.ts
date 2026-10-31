import { Component } from '@angular/core';
import { Movies } from "../../features/movies/pages/movies/movies";
import { Caculator } from "../caculator/caculator";
import { Store } from "../store/store";
import { CalculatorFather } from "../calculator-father/calculator-father";

@Component({
  selector: 'app-home',
  imports: [Movies, Caculator, Store, CalculatorFather],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
