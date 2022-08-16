import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CategoryService } from "../category/category.service";
import { Category } from "../category/category.model";
import { Subcategory } from "../category/subcategory/subcategory.model";
import { SubcategoryService } from "../category/subcategory/subcategory.service";
import { ProductService } from "../products/product.service";
import { Product } from "../products/product.model";
import { BrandService } from "../brand/brand.service";
import { Brands } from "../brand/brand.model";
import { SalesService } from "../sales-persons/sales.service";
import { Persons } from "../sales-persons/sales-person.model";
@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(private http: HttpClient,
        private cService: CategoryService,
        private sService: SubcategoryService,
        private pService: ProductService,
        private bService: BrandService,
        private salesService:SalesService){}

    storeCategory(){
        const category = this.cService.getCategor();
         this.http
        .put('https://ecatalogue-6b98d-default-rtdb.firebaseio.com/category.json',
         category).subscribe(response => {
            console.log(response);
        });
    }

    fetchCategory(){
        this.http
        .get<Category[]>('https://ecatalogue-6b98d-default-rtdb.firebaseio.com/category.json')
        .subscribe(category => {
            this.cService.setCategory(category);
        })
    }

   ///////////////////////////////////////////

    storeSubcategory(){
        const subcategory = this.sService.getSubcategor();
         this.http
        .put('https://ecatalogue-6b98d-default-rtdb.firebaseio.com/subcategory.json',
        subcategory).subscribe(response => {
            console.log(response);
        });
    }

    fetchSubcategory(){
        this.http
        .get<Subcategory[]>('https://ecatalogue-6b98d-default-rtdb.firebaseio.com/subcategory.json')
        .subscribe(subcategory => {
            this.sService.setSubcategory(subcategory);
        })
    }

    ///////////////////////////////////////////

    storeProduct(){
        const product = this.pService.getProducts();
         this.http
        .put('https://ecatalogue-6b98d-default-rtdb.firebaseio.com/product.json',
        product).subscribe(response => {
            console.log(response);
        });
    }

    fetchProduct(){
        this.http
        .get<Product[]>('https://ecatalogue-6b98d-default-rtdb.firebaseio.com/product.json')
        .subscribe(product => {
            this.pService.setProduct(product);
        })
    }


    ///////////////////////////////////////////
    
    storeBrand(){
        const brand = this.bService.getBrands();
         this.http
        .put('https://ecatalogue-6b98d-default-rtdb.firebaseio.com/brand.json',
        brand).subscribe(response => {
            console.log(response);
        });
    }

    fetchBrand(){
        this.http
        .get<Brands[]>('https://ecatalogue-6b98d-default-rtdb.firebaseio.com/brand.json')
        .subscribe(brand => {
            this.bService.setBrand(brand);
        })
    }


     ///////////////////////////////////////////
    
     storeSales(){
        const sales = this.salesService.getPersons();
         this.http
        .put('https://ecatalogue-6b98d-default-rtdb.firebaseio.com/salesPerson.json',
        sales).subscribe(response => {
            console.log(response);
        });
    }

    fetchSales(){
        this.http
        .get<Persons[]>('https://ecatalogue-6b98d-default-rtdb.firebaseio.com/salesPerson.json')
        .subscribe(person => {
            this.salesService.setPerson(person)
        })
    }






    /* fetchCategory(){
        this.http
        .get<Category[]>('http://localhost:51044/api/Categories/d8663e5e-7494-4f81-8739-6e0de1bea7ee')
        .subscribe(category => {
            this.cService.setCategory(category);
        })
    }*/

}