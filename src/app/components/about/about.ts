import { Component } from '@angular/core';
import { Padre } from "../padre/padre";
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [Padre],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {

}
