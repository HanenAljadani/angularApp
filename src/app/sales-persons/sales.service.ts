import { Subject } from "rxjs";
import { Persons } from "./sales-person.model";



export class SalesService{
    personsChanged = new Subject<Persons[]>();
    startedEditing = new Subject<number>();
    public persons: Persons[] = [
        new Persons('Test', 1234, 'Test Description'),
        new Persons('Test', 1234, 'Test Description')
      ];
      setPerson(person: Persons[]){
        this.persons = person;
        this.personsChanged.next(this.persons.slice());
    }
    getPersons(){
        return this.persons.slice(); //Return copy of array 

    }
    addPersons(product: Persons){
      this.persons.push(product);
      this.personsChanged.next(this.persons.slice());

    }

    getPerson(index:number){
      return this.persons[index];
    }
    updatePerson(index:number, newProduct:Persons){
      this.persons[index] = newProduct;
      this.personsChanged.next(this.persons.slice());


    }
    deletePerson(index: number){
      this.persons.splice(index , 1);
      this.personsChanged.next(this.persons.slice());

    }
}