import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductManagementComponent } from '../product-management/product-management.component';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit , OnDestroy{
  @ViewChild('f') pForm: NgForm ;
  subscription: Subscription ;
  editMode = false;
  editedProductIndex: number;
  editedProduct: Product ;

  constructor(private pService: ProductService,
    private management: ProductManagementComponent) { }
    ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    }
    
  ngOnInit(): void {
    this.subscription= this.pService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedProductIndex = index;
        this.editMode = true;
        this.editedProduct = this.pService.getProduct(index);
        this.pForm?.setValue({
          id: this.editedProduct.id,
          name: this.editedProduct.name,
          description: this.editedProduct.description,
          size: this.editedProduct.size,
          price: this.editedProduct.price
        })
      }
    );
  }
  onSubmit(form: NgForm){
    const value = form.value;
    const product = new Product(value.id,value.name,value.description,value.size , value.price);
    if(this.editMode){
      this.pService.updateProduct(this.editedProductIndex,product);
    }else{
    this.pService.addProducts(product);}
    this.editMode= false;
    form.reset();
  }
  onClear(){
    this.pForm.reset();
    this.editMode = false;
  }
  onView(){
     this.management.view();
  }
  onDelete(){
    this.pService.deleteProduct(this.editedProductIndex);
    this.onClear();
  }

}
