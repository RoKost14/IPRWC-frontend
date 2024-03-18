import {HttpClient, HttpHeaders} from '@angular/common/http';
import {object, z} from 'zod';
import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs';
import {Product} from "../product.model";
import {AuthService} from "./auth.service";
import {SizeCreate} from "../size-create.model";
import {CartPayload} from "../cart-payload.model";

const API_URL = 'http://localhost:8080/api/v1';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  PostLogin(payload: { username: string; password: string }) {
    return this.http.post(`${API_URL}/auth/login`, payload).pipe(
      map((data) => {
        return z
          .object({
            token: z.string(),
            username: z.string(),
            role: z.string(),
            id: z.string()
          })
          .parse(data);
      }),
      tap((data) => {
        this.authService.setToken(data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', data.id)
      })
    );
  }

  PostRegister(payload: {username: string, password: string}) {
    return this.http.post(`${API_URL}/auth/register`, payload).pipe(
    );
  }


  getProductById(uuid: string) {
    return this.http.get(`${API_URL}/products/details/${uuid}`).pipe(
      map((data) => {
        return z.object({
          id: z.string(),
          image: z.string(),
          name: z.string(),
          description: z.string(),
          price: z.number(),
          sizes: z.array(
            z.object({
              id: z.string(),
              size: z.number(),
            })
          )
        }).parse(data);
      })
    );
  }


  getAllProducts() {
    return this.http.get(`${API_URL}/products`).pipe(
      map((data) => {
        return z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            image: z.string(),
            description: z.string(),
            price: z.number(),
            sizes: z.array(
              z.object({
                id: z.string(),
                size: z.number(),
              })
            )
          })
        )
          .parse(data)
      }))
  }

  createProduct(payload: { name: string; description: string; price: number; image: string }) {
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .post(`${API_URL}/products/create`, payload, {
        headers: headers,
        observe: 'response',
      })
  }
  editProduct(uuid: string, payload: { name: string; description: string; price: number; image: string }) {
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${API_URL}/products/update/${uuid}`, payload, {
      headers: headers,
      observe: 'response'
    })
  }
  deleteProduct(uuid: string) {
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${API_URL}/products/delete/${uuid}`, {
      headers: headers,
      observe: 'response'
    })
  }

  createSizeInBulk(uuid: string, payload: SizeCreate[]) {
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .post(`${API_URL}/sizes/product/create/${uuid}`, payload, {
        headers: headers,
        observe: 'response',
      })
  }

  getSizeAndStock(uuid: string) {
    return this.http.get(`${API_URL}/products/details/${uuid}`).pipe(
      map((data: any) => {
        return z.array(
          z.object({
            size: z.number(),
          })
        ).parse(data.sizes);
      })
    )
  }
  updateSizeAndStock(uuid: string, payload: SizeCreate[] ){
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${API_URL}/sizes/update/${uuid}`, payload, {
      headers: headers,
      observe: 'response'
    })
  }
  getUsernameAndRole(){
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${API_URL}/`)
  }
  addItemToCart(uuid: string, cartItems: CartPayload) {
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .post(`${API_URL}/cart/${uuid}`, cartItems, {
        headers: headers,
        observe: 'response',
      })
  }
  getCartFromUser(uuid: string) {
    return this.http.get(`${API_URL}/cart/${uuid}`).pipe(
      map((data: any) => {
        return z.object({
          cartItems: z.array(
            z.object({
              id: z.string(),
              product: z.object({
                id: z.string(),
                name: z.string(),
                image: z.string(),
                description: z.string(),
                price: z.number(),
                sizes: z.array(
                  z.object({
                    id: z.string(),
                    size: z.number(),
                  })
                )
              }),
              size: z.object({
                id: z.string(),
                size: z.number(),
              }),
              quantity: z.number()
            })
          )
        }).parse(data);
      })
    )
  }
 deleteCart(uuid: string) {
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${API_URL}/cart/${uuid}`, {
      headers: headers,
      observe: 'response'
    })
  }
  checkout(uuid: string, payload: CartPayload[]) {
    let token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${API_URL}/cart/order/${uuid}`,{
      headers: headers,
      observe: 'response'
    })
  }
}

