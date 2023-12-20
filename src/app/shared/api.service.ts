import {HttpClient} from '@angular/common/http';
import {z} from 'zod';
import {Injectable} from '@angular/core';
import {map} from 'rxjs';
import {Product} from "../product.model";

const API_URL = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

//   getPostById(uuid: string): Observable<any> {
//     let token = this.authService.getToken();
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.get(`${API_URL}/posts/${uuid}`, { headers: headers }).pipe(
//       map(data => {
//         const parsed = z.object({
//           payload: z.object({
//             id: z.string(),
//             name: z.string(),
//             body: z.string()
//           }),
//         }).parse(data);
//         return parsed.payload;
//       })
//     );
//   }
// }
//   getAllProducts() {
//     return this.http.get(`${API_URL}/products`).pipe(
//       map((data) => {
//         return z.array(
//           z.object({
//             id: z.string(),
//             name: z.string(),
//             description: z.string(),
//             price: z.number()
//           })
//         )
//           .parse(data)
//       }))
//   }
}
