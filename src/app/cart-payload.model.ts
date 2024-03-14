import {Product} from "./product.model";
import {Size} from "./size.model";

export class CartPayload{
  constructor(public product: Product, public size: Size, public quantity: number) {
  }
}
