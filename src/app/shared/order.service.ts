// product.model.ts


// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';
import {tap} from "rxjs";
import {CartPayload} from "../cart-payload.model";

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private cartService: CartService) {}
  cartItems: CartPayload[] = []

  placeOrder() {
    console.log(this.cartService.getCartPayload())
    const order = this.cartService.getCartPayload();
    return this.http.post('/api/orders', order).pipe(
      tap(() => this.cartService.clearCart())
    );
  }
}
