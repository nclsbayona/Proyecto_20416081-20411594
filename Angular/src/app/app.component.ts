import { Component } from '@angular/core';
import { AccountManagementService } from './services/account/account-management.service';
import { ProductsService } from './services/products/products.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private products: ProductsService, private accounts: AccountManagementService) {
  }

  ngOnInit() {

    
    this.products.getProducts();
    //this.accounts.poblate();
  }

  title = 'E-Commerce';
}
