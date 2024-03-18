import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "../../shared/api.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    LucideAngularModule
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
    if (this.price <= 0) {
      this.toastr.error('Invalid price', 'Error');
      return;
    }
    if(this.image == ""){
      this.image = "https://cdn.discordapp.com/attachments/1217066891856576595/1217960687389638656/missing-image-no-available-concept-vector-23623630.jpg?ex=6605ed48&is=65f37848&hm=2afdb5a9b9bd8c1734f8b018220061d66ccd237a851fa1484c8b9c0d869830cc&"
    }
    this.apiService.editProduct( this.id,{name: this.name, description: this.description, price: this.price, image: this.image})
      .subscribe({
      next: (data) => {
        this.toastr.success('Product Edited', 'Success');
        this.router.navigate(['']);
      },
        error: (error) => {
        console.error(error);
        this.toastr.error('Invalid username or password', 'Error');
      },
    });
  }
  back(){
    this.router.navigate(['']);
  }

  deleteProduct(){
  if (window.confirm('Weet je zeker dat je dit product wilt verwijderen? Dit kan niet ongedaan worden gemaakt.')) {
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

}
