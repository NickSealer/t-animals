import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: ProductModel[] = Array.from({length: 10}, (_, idx) => 
    new ProductModel(idx + 7, `Producto aleatorio ${idx}`, 'descripcion de ejemplo', Math.floor(Math.random() * 10000), false)
  )

  getProducts(): ProductModel[] {
    return this.products.concat(this.defaultProducts()).sort((a, b) => a.name.localeCompare(b.name))
  }

  toggle(product: ProductModel): void {
    product.activate()
  }

  private defaultProducts(): ProductModel[] {
    return [
      new ProductModel(1, "Chocorramo", "Ponque con cobertura de chocolate", 2500, true),
      new ProductModel(2, "Coca cola", "Bebida gaseosa saber a kola", 3200, true),
      new ProductModel(3, "Mr Musculo", "Limpiador multiuso para el hogar", 5500, false),
      new ProductModel(4, 'Gala', 'Ponquesito rico', 2200, false),
      new ProductModel(5, 'Yogurt', 'Yougurt griego natural', 3500, true),
      new ProductModel(6, 'Salchichas', '100% de pollo sin conservantes ni colorantes', 5000, true)
    ]
  }
}
