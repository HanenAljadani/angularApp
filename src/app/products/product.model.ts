export class Product{
    public id: number;
    public name: string;
    public description: string;
    public size: string;
    public price: number;
    constructor( id: number,name:string,description:string,size: string,price: number){
        this.id = id;
        this.name = name;
        this.description = description;
        this.size = size;
        this.price = price;
    }
}