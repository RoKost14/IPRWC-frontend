import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit{
  public username: string = ""
  public role: string= ""

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.getAccountInformation()
  }

  getAccountInformation(){
    this.username = localStorage.getItem('username') ?? '';
    this.role = localStorage.getItem('role') ?? '';
  }
  logout(){
    this.authService.logOut()
  }
}
