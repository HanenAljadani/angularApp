
import { Subject } from "rxjs";
import { Subcategory } from "./subcategory.model";

export class SubcategoryService{
  subcategoryChanged = new Subject<Subcategory[]>();
  startedEditing = new Subject<number>();
    public subcategory: Subcategory[] = [
        new Subcategory(123,'Tops', true,44),
        new Subcategory(133,'Bottoms', false,44)
      ];
    //public subcategory: Subcategory[] = [];
     
    setSubcategory(subcategory: Subcategory[]){
      this.subcategory = subcategory;
      this.subcategoryChanged.next(this.subcategory.slice());
    }

    getSubcategor(){
        return this.subcategory.slice(); 

    }
    addSubcategory(subcategory: Subcategory){
      this.subcategory.push(subcategory);
      this.subcategoryChanged.next(this.subcategory.slice());

    }

    getCategory(index:number){
      return this.subcategory[index];
    }
    updateSubcategory(index:number, newSubcategory:Subcategory){
      this.subcategory[index] = newSubcategory;
      this.subcategoryChanged.next(this.subcategory.slice());


    }
    deleteSubcategory(index: number){
      this.subcategory.splice(index , 1);
      this.subcategoryChanged.next(this.subcategory.slice());

    }

}