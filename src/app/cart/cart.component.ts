import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  removeProduct(product: Product): void {
    let index = this.products.indexOf(product);
    while (index != -1) {
      this.products.splice(index, 1);
      index = this.products.indexOf(product);
    }
  }
}
