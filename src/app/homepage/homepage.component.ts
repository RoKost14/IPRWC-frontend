import { Component } from '@angular/core';
import {ProductComponent} from "./product/product.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    ProductComponent,
    RouterOutlet
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
