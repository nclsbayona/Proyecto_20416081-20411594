import { Injectable } from '@angular/core';
import { Product } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] = [];
  constructor() {
    this.products.push(new Product(1, 10.5, "https://cdn.shopify.com/s/files/1/0537/9483/2552/products/angular23_480x.jpg?v=1640032503", "NO", "Falta la descripcion", "offer"));
    this.products.push(new Product(2, 12.2, "https://cdn.shopify.com/s/files/1/0537/9483/2552/products/Angular_360x.png?v=1614384169", "Aun no hay un nombre definido, estos e debe a que no hemos pensado en que clase de sacos vamos a vender, por ahora tenemos esto y ya. Ojala les guste, besos XoXo", "Texto sin sentido puesto pata quitarse en una proxima actualizacion  :V tengo la leve sospecha que esto lo traeremos de algun servicio web, por fVIOR alguien diga algo", "offer exclusive new"));
    this.products.push(new Product(3, 19, "https://cdn.shopify.com/s/files/1/0537/9483/2552/products/Nodejs_360x.png?v=1614388512", "NO", "Falta la descripcion", "exclusive new"));
    this.products.push(new Product(4, 18.2, "https://cdn.shopify.com/s/files/1/0537/9483/2552/products/AWS_M2_3b05ab76-7294-4974-9d97-77c35d96efa5_480x.jpg?v=1615480109", "NO", "Falta la descripcion", "exclusive"));
  }
}
