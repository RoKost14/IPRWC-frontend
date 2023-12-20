import { Component } from '@angular/core';
import {HomepageComponent} from "../homepage/homepage.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [
    HomepageComponent,
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent {

}
