export class User {
  name: string;
  clicks: number = 0;
  autoclickers: number = 0;

  constructor(name: string) {
    this.name = name;
  }
}