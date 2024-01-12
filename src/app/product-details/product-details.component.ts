import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ApiService} from "../shared/api.service";
import {Subscription} from "rxjs";
import {NgForOf} from "@angular/common";
import {Size} from "../size.model";
import {Product} from "../product.model";
import {ShoppingCartComponent} from "../shopping-cart/shopping-cart.component";
import {CartService} from "../shared/cart.service";
import {FormsModule} from "@angular/forms";
import {OrderService} from "../shared/order.service";
import {AdminOnlyDirective} from "../shared/directives/admin-only.directive";

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
    private apiService: ApiService,
    private cartService: CartService,
    private orderService: OrderService
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
  addToCart(selectedSizeId: string) {
    const selectedSize = this.product.sizes.find(size => size.id === selectedSizeId);
    if (!selectedSize) {
      return;
    }
    if (selectedSize.stock > 0) {
      const productWithSelectedSize = {...this.product};
      productWithSelectedSize.sizes = [selectedSize];
      this.cartService.addToCart(productWithSelectedSize);
      this.cartService.saveCart()
      this.cartService.saveCartToSession()
    } else {
      console.log("Product is niet op voorraad")
      return
    }
  }


}
