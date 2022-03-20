import { Component, Input, OnInit } from '@angular/core';
import { Bill_Element } from '../models/bills/bill.model';

@Component({
  selector: 'app-cart-element',
  templateUrl: './cart-element.component.html',
  styleUrls: ['./cart-element.component.css']
})
export class CartElementComponent implements OnInit {

  @Input()
  element: Bill_Element=Bill_Element.Empty();

  constructor() { }

  ngOnInit(): void {
  }

}
