import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../header/data-storage.service';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit,OnDestroy {
  category: Category[];
  private cChangedSub: Subscription;
  constructor(private cService : CategoryService,
    private store: DataStorageService) { }
  ngOnDestroy(): void {
    this.cChangedSub.unsubscribe();
  }

  ngOnInit(): void {
    this.category = this.cService.getCategor();
    this.cChangedSub= this.cService.categoryChanged
        .subscribe(
          (category: Category[]) => {
            this.category = category;
          }
        );
    
  }
  onEditSubcategory(index: number){
    this.cService.startedEditing.next(index);
  }
  fetch(){
  this.store.storeCategory();
  }

}