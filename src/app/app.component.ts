import { Component } from '@angular/core';
import { ProductsService } from './services/products/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products=new ProductsService();
  title = 'E-Commerce';
}
