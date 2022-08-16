import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Brands } from '../brand.model';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brands-management',
  templateUrl: './brands-management.component.html',
  styleUrls: ['./brands-management.component.css']
})
export class BrandsManagementComponent implements OnInit ,OnDestroy {
 brands: Brands[];
 private bChangedSub: Subscription;
  constructor(private bService : BrandService) { }
  ngOnDestroy(): void {
    this.bChangedSub.unsubscribe();
  }

  ngOnInit(): void {
    this.brands = this.bService.getBrands();
    this.bChangedSub= this.bService.brandChanged
        .subscribe(
          (brand: Brands[]) => {
            this.brands = brand;
          }
        );
  }
  onEditProduct(index: number){
    this.bService.startedEditing.next(index);
}


}


