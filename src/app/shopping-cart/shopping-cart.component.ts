import {Component, OnInit} from '@angular/core';
import {NgFor} from "@angular/common";
import {Product} from "../product.model";
import {CartService} from "../shared/cart.service";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ApiService} from "../shared/api.service";
import {AuthService} from "../shared/auth.service";
import {CartPayload} from "../cart-payload.model";
import {CartItem} from "../cart-item.model";
import {ProductItemComponent} from "../product/product-item/product-item.component";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    NgFor,
    ProductItemComponent,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {
  addedItems: CartItem[] = []
  orderPayload: CartPayload[] = this.addedItems.map(item => new CartPayload(item.product, item.size, item.quantity));
  userId = localStorage.getItem('userId');

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.loadItems()

  }

  loadItems() {
    const userId = localStorage.getItem('userId');
    if (userId !== null) {
      this.apiService.getCartFromUser(userId).subscribe({
        next: (data) => {
          this.addedItems = data.cartItems
        }
      })
    }

  }

  clearCart() {
    const userId = localStorage.getItem('userId');
    if (userId !== null) {
      this.apiService.deleteCart(userId).subscribe({
        next: (data) => {
          this.toastr.success('Cart Cleared', 'Success');
          this.loadItems()
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('Something went wrong with your order', 'Error');
        }
      })
    }

  }

  getTotalPrice() {
    let total = 0;
    for (let item of this.addedItems) {
      total += item.product.price;
    }
    return total;
  }

  checkout() {
    const totalPrice = this.getTotalPrice();
    if (this.addedItems.length != 0 && this.userId !== null) {
      this.apiService.checkout(this.userId, this.addedItems).subscribe({
        next: (data) => {
          this.toastr.success('Order Placed', 'Success');
          this.router.navigate(['']);
          // this.clearCart()
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('Something went wrong with your order', 'Error');
        }
      })
    } else {
      this.toastr.error('Your cart is empty', 'Error');
    }
  }


}
