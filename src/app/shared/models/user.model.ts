export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: 'user' | 'admin',
    public photo: string,
    public shoppingLists: string[],
    public token: string = null
  ) {}
}
