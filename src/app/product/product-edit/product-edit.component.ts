import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "../../shared/api.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit{
  name: string = "";
  image: string = "";
  routeSub!: Subscription;
  description: string = ""
  price: number = 0
  id: string = ""
  constructor(public apiService: ApiService, private toastr: ToastrService, private router: Router, private route : ActivatedRoute) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['uuid']; // Save the UUID from the URL
      this.apiService.getProductById(this.id).subscribe(product => {
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.image = product.image;
      });
    });
  }



  editProduct(){
    console.log(this.id)
    this.apiService.editProduct( this.id,{name: this.name, description: this.description, price: this.price, image: this.image})
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

  deleteProduct(){
    this.apiService.deleteProduct(this.id).subscribe({
      next: (data) => {
        this.toastr.success('Product deleted successfully', 'Success');
        this.router.navigate([''])
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Invalid username or password', 'Error');
      },
    });
  }

}
