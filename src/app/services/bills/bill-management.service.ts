import { Injectable } from '@angular/core';
import { Bill, Bill_Element } from '../../models/bills/bill.model';
@Injectable({
  providedIn: 'root'
})
export class BillManagementService {
  bills: Bill[] = [];
  constructor() { }
}
