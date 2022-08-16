import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {
  products: Product[];

  constructor(private pService: ProductService,
    private route1: ActivatedRoute) { }

  ngOnInit(): void {
    this.route1.params.subscribe(params => {
      if(params['searchTerm'])
      this.products = this.pService.getProducts().filter( product=> 
        product.name.toLowerCase().includes(params['searchTerm'].toLowerCase()));
      else{
        this.products = this.pService.getProducts();
        
      }
      
    }) 
    
  }

}
