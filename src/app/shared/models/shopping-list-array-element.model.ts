export class ShoppingListArrayElement {
  constructor(
    public name: string,
    public _id: string,
    public totalPrice: number,
    public createdAt: Date,
    public user: string,
    public items: string[]
  ) {}
}
