import { Injectable } from '@angular/core';
import { Cart } from 'src/app/models/cart/cart.model';
import { User } from 'src/app/models/user/user.model';
import { Bill } from '../../models/bills/bill.model';
import { AccountManagementService } from '../account/account-management.service';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Configure } from '../utils/config';
@Injectable({
  providedIn: 'root'
})
export class BillManagementService {
  static base_url: string = "";

  constructor(private http: HttpClient) {
  }

  getBills(){
    BillManagementService.base_url = `${Configure.getIpPeticiones()}` + "bills/";
    this.http.get(BillManagementService.base_url + "get/all").pipe(map(Configure.extractData), catchError(Configure.handleError)).subscribe(data => {
      for (let c of data) {
        let create:Cart=new Cart(c.cart.user);
        for (let element of c.cart.billElements) {
          create.addElement(element.product, element.total);
        }
        BillManagementService.bills.push(new Bill(create,c.user));
      }
    });
    console.log(BillManagementService.bills);
  }

  static getNextId(): number {
      return BillManagementService.bills.length + 1;
  }

  addBill(cart: Cart, user: User) {
    return this.http.post(
      `${Configure.getIpPeticiones()}/bills/create`, cart ).pipe(
          map(Configure.extractData),
          catchError(Configure.handleError)
      );
  }

  static getAllBills(): Bill[] {
    return BillManagementService.bills;
  }

  static getUserBills() {
   /*  let user = AccountManagementService.getCurrentUser();
    let bills: Bill[] = [];
    for (let i = 0; i < BillManagementService.bills.length; i++) {
      let bill = BillManagementService.bills[i];
      if (bill.cart.owner.email == user!.email)
        bills.push(bill);
    }
    return bills; */
  }

  static bills: Bill[] = [];
}
