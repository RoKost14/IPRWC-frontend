import {Size} from "./size.model";
import {Product} from "./product.model";

export class CartItem{
  constructor(public id: string, public product: Product, public size: Size, public quantity: number) {
  }
}
