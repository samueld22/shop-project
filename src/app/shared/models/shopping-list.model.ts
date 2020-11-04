import { Item } from './item.model';

export class ShoppingList {
  constructor(
    public name: string,
    public _id: string,
    public totalPrice: number,
    public createdAt: Date,
    public user: string,
    public items: Item[]
  ) {}
}
