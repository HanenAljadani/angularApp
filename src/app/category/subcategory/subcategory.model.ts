export class Subcategory{
    public id: number;
    public name: string;
    public isActive: boolean;
    public categoryId: number;
    constructor( id: number,name:string,isActive: boolean, categoryId: number){
        this.id = id;
        this.name = name;
        this.isActive = isActive;
        this.categoryId = categoryId;
    }
}