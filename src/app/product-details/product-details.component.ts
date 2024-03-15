import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ApiService} from "../shared/api.service";
import {Subscription} from "rxjs";
import {NgForOf} from "@angular/common";
import {Product} from "../product.model";
import {ShoppingCartComponent} from "../shopping-cart/shopping-cart.component";
import {FormsModule} from "@angular/forms";
import {AdminOnlyDirective} from "../shared/directives/admin-only.directive";
import {CartPayload} from "../cart-payload.model";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    ShoppingCartComponent,
    FormsModule,
    AdminOnlyDirective,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  uuid: string = "";
  public product!: Product;
  private routeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.uuid = params['uuid'];
      this.apiService.getProductById(this.uuid).subscribe({
        next: (data) => {
          this.product = data;
          this.product.sizes.sort((a, b) => a.size - b.size);
        }
      });
    });
  }


  addToCart(sizeId : string) {
    const selectedSize = this.product.sizes.find(size => size.id === sizeId)
    const isAdmin = this.authService.isAdmin()
    if (!this.authService.isAuthenticated()) {
      this.toastr.warning('You need to be logged in', 'Warning')
      this.router.navigate(['/login'])
    } else {
      if (selectedSize) {
        const cartPayload = new CartPayload(this.product, selectedSize, 1)
        const userId = localStorage.getItem('userId')
        if (userId != null){
          this.apiService.addItemToCart(userId, cartPayload).subscribe({
            next: (data) => {
              this.toastr.success('Login successful', 'Success');
            },
            error: (error) => {
              this.toastr.error('Invalid username or password', 'Error');
            },
          })
        }
      } else {
      }
    }

  }
}
