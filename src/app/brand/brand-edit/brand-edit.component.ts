import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Brands } from '../brand.model';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') pForm: NgForm ;
  subscription: Subscription ;
  editMode = false;
  editedBrandIndex: number;
  editedBrand: Brands ;
  constructor(private bService: BrandService) { }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription= this.bService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedBrandIndex = index;
        this.editMode = true;
        this.editedBrand = this.bService.getBrand(index);
        this.pForm?.setValue({
          id: this.editedBrand.id,
          name: this.editedBrand.name,
          isActive: this.editedBrand.isActive
        })
      }
    );
  }
  onSubmit(form: NgForm){
    const value = form.value;
    if(value.isActive === 'yes'){
      value.isActive = true;
    }else{
      value.isActive = false;
    }
    const brand = new Brands(value.id,value.name,value.isActive);
    if(this.editMode){
      this.bService.updateBrand(this.editedBrandIndex,brand);
    }else{
    this.bService.addBrand(brand);}
    this.editMode= false;
    form.reset();
    
  }

  onClear(){
    this.pForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.bService.deleteBrand(this.editedBrandIndex);
    this.onClear();
  }

}
