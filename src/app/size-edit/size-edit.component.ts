import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {ApiService} from "../shared/api.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {SizeCreate} from "../size-create.model";

interface SizeAndStock {
  size: number;
  stock: number;
}

@Component({
  selector: 'app-size-edit',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        RouterModule
    ],
  templateUrl: './size-edit.component.html',
  styleUrl: './size-edit.component.scss'
})
export class SizeEditComponent implements OnInit, OnDestroy {
  uuid: string = ""
  routeSub!: Subscription;
  public sizeAndStock: SizeCreate[] = []
  public updatedSizeAndStock: SizeCreate[]= []
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.uuid = params['uuid']; // Save the UUID from the URL
    });

    this.apiService.getSizeAndStock(this.uuid).subscribe({
      next: (data: SizeCreate[]) =>{
        this.sizeAndStock = data
        console.log(this.sizeAndStock)

      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editSizeAndStock() {
    this.updatedSizeAndStock = this.sizeAndStock.map(item => {
      return {
        size: item.size,
      };
    });
    this.apiService.updateSizeAndStock(this.uuid, this.updatedSizeAndStock).subscribe({
      next: (response) => {
        console.log('Size and stock updated successfully', response);
        this.router.navigate([''])
      },
      error: (error) => {
        console.error('Error updating size and stock', error);
      }
    });

  }
  removeSizeAndStock(index: number){
    this.sizeAndStock.splice(index, 1);
  }
  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe(); // Unsubscribe when the component is destroyed
    }
  }
}
