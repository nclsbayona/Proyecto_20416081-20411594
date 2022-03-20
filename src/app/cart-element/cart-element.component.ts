import { Component, Input, OnInit } from '@angular/core';
import { Bill_Element } from '../models/bills/bill.model';
import { AccountManagementService } from '../services/account/account-management.service';
import { CartManagementService } from '../services/cart/cart-management.service';

@Component({
  selector: 'app-cart-element',
  templateUrl: './cart-element.component.html',
  styleUrls: ['./cart-element.component.css']
})
export class CartElementComponent implements OnInit {

  @Input()
  element: Bill_Element = Bill_Element.Empty();


  removeFromCart(): void {
    CartManagementService.removeElementFromUserCart(AccountManagementService.getCurrentUser()!, this.element.product, 1);
  }

  addToCart(): void {
    CartManagementService.addToCart(this.element.product, 1, AccountManagementService.getCurrentUser()!);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
