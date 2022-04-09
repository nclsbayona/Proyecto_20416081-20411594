import { Component, Input, OnInit } from '@angular/core';
import { Bill_Element } from '../models/bills/bill.model';

@Component({
  selector: 'app-bill-element',
  templateUrl: './bill-element.component.html',
  styleUrls: ['./bill-element.component.css']
})
export class BillElementComponent implements OnInit {

  @Input()
  element: Bill_Element = Bill_Element.Empty();

  constructor() { }

  ngOnInit(): void {
  }

}
