import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit, OnDestroy {
  products: Product[] =[];
  viewClicked=false;
  private pChangedSub: Subscription = new Subscription;
  constructor(private pService: ProductService) { }
  ngOnDestroy(): void {
    this.pChangedSub.unsubscribe();
  }

  ngOnInit(): void {
    this.products = this.pService.getProducts();
    //
    this.pChangedSub= this.pService.productChanged
        .subscribe(
          (products: Product[]) => {
            this.products = products;
          }
        );
  }
  view(){
    this.viewClicked=!this.viewClicked;
  }
  onEditProduct(index: number){
       this.pService.startedEditing.next(index);
  }
}
