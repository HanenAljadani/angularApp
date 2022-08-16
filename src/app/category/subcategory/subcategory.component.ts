import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subcategory } from './subcategory.model';
import { SubcategoryService } from './subcategory.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit,OnDestroy {
  subcategory: Subcategory[];
  private sChangedSub: Subscription;
  constructor(private sService : SubcategoryService) { }
  ngOnDestroy(): void {
    this.sChangedSub.unsubscribe();
  }

  ngOnInit(): void {
    this.subcategory = this.sService.getSubcategor();
    this.sChangedSub= this.sService.subcategoryChanged
        .subscribe(
          (subcategory: Subcategory[]) => {
            this.subcategory = subcategory;
          }
        );
  }
  onEditSubcategory(index: number){
    this.sService.startedEditing.next(index);
}

}
