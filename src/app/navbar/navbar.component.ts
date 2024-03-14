import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterModule} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import {AdminOnlyDirective} from "../shared/directives/admin-only.directive";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-navbar',
  standalone: true,
    imports: [RouterModule, AdminOnlyDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef,
              private toastr: ToastrService){
  }
  logInButton(){
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/account'])
    } else{
      this.router.navigate(['/login'])
    }
  }
  shoppingCartButton(){
    if(!this.authService.isAuthenticated()){
      this.toastr.warning('You need to be logged in', 'Warning')
      this.router.navigate(['/login'])
    } else {
      this.router.navigate(['/shopping-cart'])
    }
  }
  ngOnInit() {
    this.router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        if (event.url === '/'){
          window.location.reload()
        }
      }
    })


  }

}
