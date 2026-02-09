import { Product } from "../interfaces/product.interface";

export class ProductModel implements Product {
  constructor(public readonly id: number, public name: string, public description: string, public price: number, public active: boolean) {}
  
  activate(): void {
    this.active = !this.active
  }

  get fullDesc(): string {
    return `Nombre: ${this.name.toUpperCase()} - ${this.description}`;
  }
}
