import { Component, OnInit } from '@angular/core';
import { Bill_Element } from '../models/bills/bill.model';
import { Cart } from '../models/cart/cart.model';
import { AccountManagementService } from '../services/account/account-management.service';
import { CartManagementService } from '../services/cart/cart-management.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart|null=null;
  constructor() {
  }

  ngOnInit(): void {
  }

  getCartElements(): Bill_Element[] {
    this.updateCart();
    return this.cart!.elements;
  }

  removeCart(): void {
    this.cart=null;
  }

  updateCart(): void {
    this.cart=CartManagementService.getSpecificUserCart(AccountManagementService.getCurrentUser()!);
  }

  payCart(): void {
    CartManagementService.payCart(AccountManagementService.getCurrentUser()!);
    this.updateCart();
  }

  getTotal(): number {
    return this.cart!.getTotal();
  }

}
