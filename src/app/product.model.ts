import {Size} from "./size.model";

export class Product{
  constructor(public id: string, public name: string, public description: string, public price: number, public sizes: Size[]) {
  }
}
