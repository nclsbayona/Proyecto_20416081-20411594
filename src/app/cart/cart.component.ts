import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart/cart.model';
import { Product } from '../models/product/product.model';
import { AccountManagementService } from '../services/account/account-management.service';
import { CartManagementService } from '../services/cart/cart-management.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart|null=null;
  constructor() { }

  addToCart(product: Product): void {
    CartManagementService.addToCart(product, 1, AccountManagementService.getCurrentUser()!);
    this.updateCart();
  }

  ngOnInit(): void {
  }

  removeCart(): void {
    this.cart=null;
  }

  updateCart(): void {
    this.cart=CartManagementService.getSpecificUserCart(AccountManagementService.getCurrentUser()!);
  }

}
