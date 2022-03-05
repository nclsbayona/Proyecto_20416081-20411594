import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos/productos.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products=new ProductosService();
  constructor() { }

  ngOnInit(): void {
  }

}
