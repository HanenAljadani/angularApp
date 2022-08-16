import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Persons } from '../sales-person.model';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-sales-persons-edit',
  templateUrl: './sales-persons-edit.component.html',
  styleUrls: ['./sales-persons-edit.component.css']
})
export class SalesPersonsEditComponent implements OnInit , OnDestroy{
  //persons: Persons[]=[];
  @ViewChild('f') sForm: NgForm ;
  editMode = false;
  editedPersonIndex: number;
  editedPerson: Persons ;
  subscription: Subscription ;
  constructor(private salesService:SalesService) { }

  ngOnInit(): void {
    this.subscription= this.salesService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedPersonIndex = index;
        this.editMode = true;
        this.editedPerson = this.salesService.getPerson(index);
        this.sForm?.setValue({
          name: this.editedPerson.name,
          phoneNumber: this.editedPerson.phoneNumber,
          description: this.editedPerson.description
        })
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  onSubmit(form: NgForm){
    const value = form.value;
    const product = new Persons(value.name,value.phoneNumber,value.description);
    if(this.editMode){
      this.salesService.updatePerson(this.editedPersonIndex,product);
    }else{
    this.salesService.addPersons(product);}
    this.editMode= false;
    form.reset();
    
  }

  onDelete(){
    this.salesService.deletePerson(this.editedPersonIndex);
    this.onClear();
  }
  onClear(){
    this.sForm.reset();
    this.editMode = false;
  }
  /*
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
    
  ngOnInit(): void {
    this.subscription= this.pService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedProductIndex = index;
        this.editMode = true;
        this.editedProduct = this.pService.getProduct(index);
        this.pForm?.setValue({
          name: this.editedProduct.name,
          tag: this.editedProduct.tag,
          description: this.editedProduct.description
        })
      }
    );
  }
  onSubmit(form: NgForm){
    const value = form.value;
    const product = new Product(value.name,value.tag,value.description);
    if(this.editMode){
      this.pService.updateProduct(this.editedProductIndex,product);
    }else{
    this.pService.addProducts(product);}
    this.editMode= false;
    form.reset();
    
  }
  onClear(){
    this.pForm.reset();
    this.editMode = false;
  }
  onView(){
     this.management.view();
  }
  onDelete(){
    this.pService.deleteProduct(this.editedProductIndex);
    this.onClear();
  }

}

  */
  //Add(){
  //  this.router.navigate(['/salesPersons']);
 // }
  /*onAddItem(form:NgForm){
    const value = form.value;
   const newSalesPersons = new Persons(value.name , value.phoneNumber, value.description);
   this.salesPerson.onAddItem(newSalesPersons);
  }*/

}
