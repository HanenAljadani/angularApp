import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../category/category.model';
import { CategoryService } from '../category/category.service';
import { Subcategory } from '../category/subcategory/subcategory.model';
import { SubcategoryService } from '../category/subcategory/subcategory.service';
import { DataStorageService } from '../header/data-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   opened= false;
   clickM=false;
   category: Category[];
   subcategory: Subcategory[];
   showProduct=false;
  constructor(private cService : CategoryService,
    private sService : SubcategoryService,
    private store: DataStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.store.fetchCategory();
    this.category = this.cService.getCategor();
    this.subcategory = this.sService.getSubcategor();
  }
  sidebar(){
    this.opened = !this.opened;
    this.showProduct = false;
  }
  clickedM(){
    this.clickM= !this.clickM;
  }

  fetch(){
    this.store.fetchCategory();
      }
  show(){
    this.showProduct = true;
    //this.router.navigate(['/products']);
  }
}
