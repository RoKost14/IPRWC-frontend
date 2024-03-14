import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Size} from "../size.model";
import {SizeCreate} from "../size-create.model";
import {ApiService} from "../shared/api.service";
import {ProductComponent} from "../product/product.component";
import {ToastrService} from "ngx-toastr";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {
  name: string = "";
  image: string = "";
  description: string = ""
  price: number = 0
  id!: string;


  constructor(private apiService: ApiService, private toastr: ToastrService, private router: Router) {
  }
  createProduct(){
    this.apiService.createProduct({name: this.name, description: this.description, price: this.price, image: this.image})
      .subscribe({
      next: (data) => {

        this.toastr.success('Login successful', 'Success');
        this.router.navigate(['sizes/create/', data.body]);
      },
        error: (error) => {
        console.error(error);
        this.toastr.error('Invalid username or password', 'Error');
      },
    });

  }


}
