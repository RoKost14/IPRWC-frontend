import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ApiService} from "../shared/api.service";
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
    if(this.price < 0){
      this.toastr.error('Invalid price', 'Error');
      return;
    }
    if(this.image == ""){
      this.image = "https://cdn.discordapp.com/attachments/1217066891856576595/1217960687389638656/missing-image-no-available-concept-vector-23623630.jpg?ex=6605ed48&is=65f37848&hm=2afdb5a9b9bd8c1734f8b018220061d66ccd237a851fa1484c8b9c0d869830cc&"
    }
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
