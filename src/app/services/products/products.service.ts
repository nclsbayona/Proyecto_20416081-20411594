import { Injectable } from '@angular/core';
import { Product } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  static remove(p: Product) {
    console.log(this.products);
    for (let product of ProductsService.products) {
      if (product.id == p.id) {
        ProductsService.products.splice(ProductsService.products.indexOf(product), 1);
        return;
      }
    }
  }

  static products: Product[] = [];

  static poblate(){
    ProductsService.products.push(new Product(1, 10.5, "https://cdn.shopify.com/s/files/1/0537/9483/2552/products/angular23_480x.jpg?v=1640032503", "NOMBRE1", "Falta la descripcion", "offer"));
    ProductsService.products.push(new Product(2, 12.2, "https://cdn.shopify.com/s/files/1/0537/9483/2552/products/Angular_360x.png?v=1614384169", "NOMBRE2", "Texto sin sentido puestoalgo", "offer exclusive new"));
    ProductsService.products.push(new Product(3, 19, "https://cdn.shopify.com/s/files/1/0537/9483/2552/products/Nodejs_360x.png?v=1614388512", "NOMBRE3", "Falta la descripcion", "exclusive new"));
    ProductsService.products.push(new Product(4, 18.2, "https://cdn.shopify.com/s/files/1/0537/9483/2552/products/AWS_M2_3b05ab76-7294-4974-9d97-77c35d96efa5_480x.jpg?v=1615480109", "NOMBRE4", "Falta la descripcion", "exclusive"));
  }

  static insertProduct(id: number, price: number, image: String, nombre: String, descripcion: String, specials: String): Boolean{
    ProductsService.products.push(new Product(id, price, image, nombre, descripcion, specials));
    return true;
  }

  static getProductById(idS: string): Product {
    let id=parseInt(idS);
    for (let product of ProductsService.products) {
      if (product.id == id) {
        return product;
      }
    }
    return Product.Empty();
  }
}
