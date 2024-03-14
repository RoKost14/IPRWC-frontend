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
    this.loadCart
  }

  addToCart(product: Product) {
    this.addedItems.push(product);
  }

  getItems() {
    return this.addedItems;
  }
  loadCart(){

  }
  checkout() {
    const payload = this
    return this.http.post(`${API_URL}/cart/order`, payload)
  }

}
