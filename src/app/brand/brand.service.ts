
import { Subject } from "rxjs";
import { Brands } from "./brand.model";

export class BrandService{
  brandChanged = new Subject<Brands[]>();
  startedEditing = new Subject<number>();
    public brands: Brands[] = [
        new Brands(123,'Zara', true),
        new Brands(133,'Mango', false)
      ];

    
    setBrand(brand: Brands[]){
        this.brands = brand;
        this.brandChanged.next(this.brands.slice());
    }
    getBrands(){
        return this.brands.slice(); 

    }
    addBrand(brand: Brands){
      this.brands.push(brand);
      this.brandChanged.next(this.brands.slice());

    }

    getBrand(index:number){
      return this.brands[index];
    }
    updateBrand(index:number, newBrand:Brands){
      this.brands[index] = newBrand;
      this.brandChanged.next(this.brands.slice());


    }
    deleteBrand(index: number){
      this.brands.splice(index , 1);
      this.brandChanged.next(this.brands.slice());

    }

}