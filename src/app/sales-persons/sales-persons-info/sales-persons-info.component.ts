import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Persons } from '../sales-person.model';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-sales-persons-info',
  templateUrl: './sales-persons-info.component.html',
  styleUrls: ['./sales-persons-info.component.css']
})
export class SalesPersonsInfoComponent implements OnInit {
  persons: Persons[];
  private pChangedSub: Subscription;
  constructor(private salesService : SalesService) { }

  ngOnInit(): void {
    this.persons = this.salesService.getPersons();
    this.pChangedSub= this.salesService.personsChanged
        .subscribe(
          (person: Persons[]) => {
            this.persons = person;
          }
        );
  }
  
  onEditProduct(index: number){
    this.salesService.startedEditing.next(index);
}

}
