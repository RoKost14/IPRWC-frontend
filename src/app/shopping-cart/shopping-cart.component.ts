import {Component, OnInit} from '@angular/core';
import {NgFor} from "@angular/common";
import {Product} from "../product.model";
import {CartService} from "../shared/cart.service";
import {OrderService} from "../shared/order.service";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    NgFor,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {
  addedItems: Product[] = []

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.addedItems = this.cartService.getItems()
    console.log(this.addedItems)
    this.cartService.loadCartFromSession()

  }

  clearCart() {
    this.cartService.clearCart()
    this.addedItems = this.cartService.getItems()
  }

  getTotalPrice() {
    let total = 0;
    for (let item of this.addedItems) {
      total += item.price;
    }
    return total;
  }

  checkout() {
    this.cartService.checkout().subscribe({
      next: (data) => {
        this.toastr.success('Login successful', 'Success');
        this.router.navigate(['']);
        this.clearCart()
      }
      ,
      error: (error) => {
        console.error(error);
        this.toastr.error('Invalid username or password', 'Error');
      }
    })
  }


}
