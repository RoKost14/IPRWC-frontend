import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ApiService} from "../shared/api.service";
import {Subscription} from "rxjs";
import {NgForOf} from "@angular/common";
import {Size} from "../size.model";
import {Product} from "../product.model";
import {ShoppingCartComponent} from "../shopping-cart/shopping-cart.component";
import {CartService} from "../shared/cart.service";
import {FormsModule} from "@angular/forms";
import {AdminOnlyDirective} from "../shared/directives/admin-only.directive";
import {CartPayload} from "../cart-payload.model";
import {error} from "@angular/compiler-cli/src/transformers/util";
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
  private routeSub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.uuid = params['uuid']; // Save the UUID from the URL
      this.readProductDetail(this.uuid)
      console.log(this.uuid)

      this.apiService.getProductById(this.uuid).subscribe({
        next: (data) => {
          console.log(this.uuid)

          this.product = data; // Assuming the API returns an array with one product
          console.log(this.uuid)
        }
      });
    });
  }

  readProductDetail(uuid: string) {
    if (uuid == "") {
      return;
    }
  }
  addToCart(sizeId : string) {
    const selectedSize = this.product.sizes.find(size => size.id === sizeId)
    if (!this.authService.isAuthenticated()) {
      this.toastr.warning('You need to be logged in', 'Warning')
      this.router.navigate(['/login'])
    } else {
      if (selectedSize) {
        const cartPayload = new CartPayload(this.product, selectedSize, 1)
        const userId = localStorage.getItem('userId')
        if (userId != null) {
          this.apiService.addItemToCart(userId, cartPayload).subscribe({
            next: (data) => {
              console.log(cartPayload)
              this.toastr.success('Login successful', 'Success');
            },
            error: (error) => {
              console.error(error);
              this.toastr.error('Invalid username or password', 'Error');
            },
          })
        }
      } else {
        console.error('Size not found');
      }
    }

  }
}
