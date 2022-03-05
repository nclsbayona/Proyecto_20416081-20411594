import { Component } from '@angular/core';
import { ProductosService } from './services/productos/productos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products=new ProductosService();
  title = 'E-Commerce';
}
