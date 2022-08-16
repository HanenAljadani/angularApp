
import { Subject } from "rxjs";
import { Category } from "./category.model";

export class CategoryService{
  categoryChanged = new Subject<Category[]>();
  startedEditing = new Subject<number>();
    public category: Category[] = [
        new Category(123,'Men', true),
        new Category(133,'Women', true),
        new Category(133,'Kids', true)
      ];
    //public category: Category[] = [] 
    
    setCategory(category: Category[]){
      this.category = category;
      this.categoryChanged.next(this.category.slice());
    }
    
    getCategor(){
        return this.category.slice(); 

    }
    addCategory(category: Category){
      this.category.push(category);
      this.categoryChanged.next(this.category.slice());
      

    }

    getCategory(index:number){
      return this.category[index];
    }
    updateCategory(index:number, newCategory:Category){
      this.category[index] = newCategory;
      this.categoryChanged.next(this.category.slice());


    }
    deleteCategory(index: number){
      this.category.splice(index , 1);
      this.categoryChanged.next(this.category.slice());

    }

}