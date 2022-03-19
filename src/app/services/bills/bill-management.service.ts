import { Injectable } from '@angular/core';
import { Bill, Bill_Element } from '../../models/bills/bill.model';
@Injectable({
  providedIn: 'root'
})
export class BillManagementService {
  static getNextId(): number {
      return BillManagementService.bills.length + 1;
  }

  static bills: Bill[] = [];

  constructor() { }
}
