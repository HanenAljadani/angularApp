import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/header/data-storage.service';
import { Subcategory } from '../subcategory.model';
import { SubcategoryService } from '../subcategory.service';

@Component({
  selector: 'app-subcategory-edit',
  templateUrl: './subcategory-edit.component.html',
  styleUrls: ['./subcategory-edit.component.css']
})
export class SubcategoryEditComponent implements OnInit , OnDestroy{
  @ViewChild('f') pForm: NgForm ;
  subscription: Subscription ;
  editMode = false;
  editedsubCategoryIndex: number;
  editedSubcategory: Subcategory ;
  constructor(private sService: SubcategoryService,
    private store: DataStorageService) { }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription= this.sService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedsubCategoryIndex = index;
        this.editMode = true;
        this.editedSubcategory = this.sService.getCategory(index);
        this.pForm?.setValue({
          id: this.editedSubcategory.id,
          name: this.editedSubcategory.name,
          isActive: this.editedSubcategory.isActive,
          categoryId: this.editedSubcategory.categoryId
        })
      }
    );
  }
  onSubmit(form: NgForm){
    const value = form.value;
    const subcategory = new Subcategory(value.id,value.name,value.isActive,value.categoryId);
    if(this.editMode){
      this.sService.updateSubcategory(this.editedsubCategoryIndex,subcategory);
    }else{
    this.sService.addSubcategory(subcategory);}
    this.editMode= false;
    this.store.storeCategory();
    form.reset();
    
  }

  onClear(){
    this.pForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.sService.deleteSubcategory(this.editedsubCategoryIndex);
    this.onClear();
  }
}
