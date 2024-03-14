import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {SizeCreate} from "../size-create.model";
import {ApiService} from "../shared/api.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-size-create',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './size-create.component.html',
  styleUrl: './size-create.component.scss'
})
export class SizeCreateComponent implements OnInit{
  public standardSizes: number[] = [];
  public selectedSizes: {[key: number]: boolean} = {};
  public sizeStock: {[key: number]: number} = {};
  public selectedSizesAndStock: SizeCreate[] = [];
  public smallestSize: number = 35;
  public largestSize: number = 50;
  public size: number = 0;
  public stock!: number;
  public productId: string = "";
  constructor(private apiService: ApiService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) {
  }

  populateSizeArray(){
    for(let i = this.smallestSize; i <= this.largestSize; i += 0.5){
      this.standardSizes.push(i);
      this.selectedSizes[i] = false;
      this.sizeStock[i] = 0;
    }
  }
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.productId = params['uuid'];
      console.log(this.productId)
    });
    this.populateSizeArray()
  }
  addSize() {
    for (let size in this.selectedSizes) {
      if (this.selectedSizes[size]) {
        this.selectedSizesAndStock.push({size: Number(size)});
      }
    }

    this.apiService.createSizeInBulk(this.productId, this.selectedSizesAndStock).subscribe({
      next: (data) => {

      this.toastr.success('Login successful', 'Success');
      this.router.navigate(['']);
    },
      error: (error) => {
      console.error(error);
      this.toastr.error('Invalid username or password', 'Error');
    },
  });
  }

}
