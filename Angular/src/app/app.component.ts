import { Component } from '@angular/core';
import { AccountManagementService } from './services/account/account-management.service';
import { BillManagementService } from './services/bills/bill-management.service';
import { CartManagementService } from './services/cart/cart-management.service';
import { ProductsService } from './services/products/products.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private products: ProductsService, private accounts: AccountManagementService, private carts: CartManagementService, private bills: BillManagementService) {
  }

  ngOnInit() {
    this.products.getProducts();
    this.accounts.getUsers();
    
    //this.carts.getCarts();
    //this.bills.getBills();
  }

  title = 'Dev-Hoodies';
}
