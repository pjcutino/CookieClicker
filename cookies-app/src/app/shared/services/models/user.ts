export class User {
  name: string;
  clicks: number = 0;
  autoclickers: number = 0;
  megaautoclickers: number = 0;
  clickerLevel : number = 1;

  constructor(name: string) {
    this.name = name;
  }
}