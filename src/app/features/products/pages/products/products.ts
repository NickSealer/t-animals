import { Component } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Pets } from '../../../pets-two/pages/pets/pets';

@Component({
  selector: 'app-products',
  imports: [Pets],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  products: ProductModel[] = []

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts()
  }

  showDesc(product: ProductModel): void {
    alert(product.fullDesc);
  }

  toggleActive(product: ProductModel): void {
    this.productService.toggle(product)
  }
}
