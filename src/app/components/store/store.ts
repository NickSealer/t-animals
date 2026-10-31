import { Component } from '@angular/core';

@Component({
  selector: 'app-store',
  imports: [],
  templateUrl: './store.html',
  styleUrl: './store.scss',
})
export class Store {
  products: Product[] = []

  addProduct(name: string, price: number | string): void {
    try {
      const product = new Product(name, Number(price))
      this.products.push(product)
    } catch (error: any) {
      throw new Error('error en el producto', error) 
    }
  }
}

class Product {
  constructor(public name: string, public price: number){}
}