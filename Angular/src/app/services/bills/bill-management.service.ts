import { Injectable } from '@angular/core';
import { Cart } from 'src/app/models/cart/cart.model';
import { User } from 'src/app/models/user/user.model';
import { Bill, Bill_Element } from '../../models/bills/bill.model';
import { AccountManagementService } from '../account/account-management.service';
@Injectable({
  providedIn: 'root'
})
export class BillManagementService {
  static getNextId(): number {
      return BillManagementService.bills.length + 1;
  }

  static addBill(cart: Cart, user: User): void {
      let bill = new Bill(cart,user);
      BillManagementService.bills.push(bill);
  }

  static getAllBills(): Bill[] {
    return BillManagementService.bills;
  }

  static getUserBills(): Bill[] {
    let user = AccountManagementService.getCurrentUser();
    let bills: Bill[] = [];
    for (let i = 0; i < BillManagementService.bills.length; i++) {
      let bill = BillManagementService.bills[i];
      if (bill.cart.owner.email == user!.email)
        bills.push(bill);
    }
    return bills;
  }

  static bills: Bill[] = [];

  constructor() { }
}
