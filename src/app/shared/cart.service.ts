import {Product} from "../product.model";
import {Injectable} from "@angular/core";
import {CartPayload} from "../cart-payload.model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";

const API_URL = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private addedItems: Product[] = [];

  constructor(private http: HttpClient, private authService: AuthService, private apiService: ApiService
  ) {
    this.loadCartFromSession();
  }

  addToCart(product: Product) {
    this.addedItems.push(product);
    this.saveCart()
    this.saveCartToSession();
  }

  getItems() {
    return this.addedItems;
  }

  clearCart() {
    this.addedItems = [];
    this.saveCartToSession();
    return this.addedItems
  }

  // }
  getCartPayload(): CartPayload[] {
    const payload: CartPayload[] = [];
    for (let item of this.addedItems) {
      for (let size of item.sizes) {
        const existingPayload = payload.find(p => p.sizeId === size.id);
        if (existingPayload) {
          existingPayload.quantity++;
        } else {
          payload.push(new CartPayload(size.id, 1));
        }
      }
    }
    console.log(payload)
    return payload;

  }

  checkout() {
    const payload = this.getCartPayload();
    return this.http.post(`${API_URL}/cart/order`, payload)
  }
  saveCart() {
    let uuid = this.authService.getUserId(); // You should implement this method in your AuthService
    if (!uuid) {
      throw new Error('User ID is null');
    }
    let cartItems = this.getItems();
    return this.apiService.saveCartForUser(uuid, cartItems);

  }

   saveCartToSession() {
    localStorage.setItem('cart', JSON.stringify(this.addedItems));
  }

   loadCartFromSession() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.addedItems = JSON.parse(storedCart);
    }
  }

}
