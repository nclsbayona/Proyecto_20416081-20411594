import { Component, OnInit } from '@angular/core';
import { Bill } from '../models/bills/bill.model';
import { BillManagementService } from '../services/bills/bill-management.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  bill_management = BillManagementService;

  getAdminBills(): Bill[]{
    return this.bill_management.getAllBills();
  }

  getUserBills():Bill[]{
    return this.bill_management.getUserBills();
  }

  constructor() { }

  ngOnInit(): void {
  }

  isAdmin(): boolean{
    let ret=false;
    let cname = "user=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length && !ret; i++){
        let c = ca[i];
        while(c.charAt(0) == ' '){
            c = c.substring(1);
        }
        if(c.indexOf(cname) == 0){
            JSON.parse(c.substring(cname.length, c.length)).admin?ret=true:ret=false;
        }
    }
    return ret;
  }

}
