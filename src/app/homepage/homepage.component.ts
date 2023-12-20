import { Component } from '@angular/core';
import {ProductComponent} from "./product/product.component";
import {RouterOutlet} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    ProductComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
