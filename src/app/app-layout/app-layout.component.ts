import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {ProductComponent} from "../product/product.component";

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [
    ProductComponent,
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent {

}
