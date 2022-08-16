import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/header/data-storage.service';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit, OnDestroy{
  @ViewChild('f') pForm: NgForm ;
  subscription: Subscription ;
  editMode = false;
  editedCategoryIndex: number;
  editedCategory: Category ;
  constructor(private cService: CategoryService,
    private store: DataStorageService) { }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription= this.cService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedCategoryIndex = index;
        this.editMode = true;
        this.editedCategory = this.cService.getCategory(index);
        this.pForm?.setValue({
          id: this.editedCategory.id,
          name: this.editedCategory.name,
          isActive: this.editedCategory.isActive
        })
      }
    );
  }
  onSubmit(form: NgForm){
    const value = form.value;
    if(value.isActive === 'Yes'){
      value.isActive = true;
    }else{
      value.isActive = false;
    }
    const category = new Category(value.id,value.name,value.isActive);
    if(this.editMode){
    this.cService.updateCategory(this.editedCategoryIndex,category);
   }else{
    this.cService.addCategory(category);}
    this.editMode= false;
   this.store.storeCategory();
   
    form.reset();
    
  }
  
  onClear(){
    this.pForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.cService.deleteCategory(this.editedCategoryIndex);
    this.onClear();
  }

}
