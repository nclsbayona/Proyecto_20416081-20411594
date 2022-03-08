import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
declare let $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products = new ProductsService();
  constructor() {}
  ngOnInit(): void {
  }

}
