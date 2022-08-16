import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthComponent } from '../auth/auth.component';
import { AuthService } from '../auth/auth.service';
import { Category } from '../category/category.model';
import { CategoryService } from '../category/category.service';
import { Subcategory } from '../category/subcategory/subcategory.model';
import { SubcategoryService } from '../category/subcategory/subcategory.service';
import { DataStorageService } from './data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  management= true;
  opened= true;
   clickM=false;
   category: Category[];
   subcategory: Subcategory[];
   manage = false;
   isAuthenticated = false;
   private userSub: Subscription;
   constructor(private cService : CategoryService,
    private sService : SubcategoryService,
    private store: DataStorageService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.store.fetchCategory();
    this.category = this.cService.getCategor();
    this.subcategory = this.sService.getSubcategor();
    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticated = !user ? false : true;
      });
    
   

  }
  onLogout(){
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  managementMode(){
    this.management = !this.management;
  }
  idebar(){
    this.opened = !this.opened;
  }
  clickedM(){
    this.clickM= !this.clickM;
  }
  menu(){
    this.opened = !this.opened;
  }
 
  show(){
    this.router.navigate(['/products']);
  }

}
