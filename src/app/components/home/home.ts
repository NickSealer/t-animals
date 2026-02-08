import { Component } from '@angular/core';
import { Movies } from "../../features/movies/pages/movies/movies";

@Component({
  selector: 'app-home',
  imports: [Movies],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
