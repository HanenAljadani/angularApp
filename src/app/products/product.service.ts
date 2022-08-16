
import { Subject } from "rxjs";
import { Product } from "./product.model";

export class ProductService{
  productChanged = new Subject<Product[]>();
  startedEditing = new Subject<number>();
    public products: Product[] = [
        new Product(123,'Test', 'Test Description', 'M' , 25),
        new Product(123,'Test', 'Test Description', 'M' , 25),
        new Product(123,'Test', 'Test Description', 'M' , 25)
      ];
      
       //get http request 
       //add  view DONE
       // , update, DONE
       //clear , DONE 
       // delete , 
       setProduct(product: Product[]){
        this.products = product;
        this.productChanged.next(this.products.slice());
      }
      getProducts(){
        return this.products.slice(); //Return copy of array 

    }
    addProducts(product: Product){
      this.products.push(product);
      this.productChanged.next(this.products.slice());

    }

    getProduct(index:number){
      return this.products[index];
    }
    updateProduct(index:number, newProduct:Product){
      this.products[index] = newProduct;
      this.productChanged.next(this.products.slice());


    }
    deleteProduct(index: number){
      this.products.splice(index , 1);
      this.productChanged.next(this.products.slice());

    }

}