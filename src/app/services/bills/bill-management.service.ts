import { Injectable } from '@angular/core';
import { Cart } from 'src/app/models/cart/cart.model';
import { Bill, Bill_Element } from '../../models/bills/bill.model';
@Injectable({
  providedIn: 'root'
})
export class BillManagementService {
  static getNextId(): number {
      return BillManagementService.bills.length + 1;
  }

  static addBill(cart: Cart): void {
      let bill = new Bill(cart);
      BillManagementService.bills.push(bill);
  }

  static bills: Bill[] = [];

  constructor() { }
}
