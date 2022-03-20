import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '../models/bills/bill.model';

@Component({
  selector: 'app-bill-specific',
  templateUrl: './bill-specific.component.html',
  styleUrls: ['./bill-specific.component.css']
})
export class BillSpecificComponent implements OnInit {

  @Input()
  bill: Bill=Bill.Empty();
  
  constructor() { }

  ngOnInit(): void {
  }

}
