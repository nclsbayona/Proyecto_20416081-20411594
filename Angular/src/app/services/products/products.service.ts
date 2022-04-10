import { Injectable } from '@angular/core';
import { Product } from '../../models/product/product.model';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Configure } from '../utils/config';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  static products: Product[] = [];
  static base_url: string = "";

  constructor(private http: HttpClient) {
  }

  getProducts() {
    ProductsService.base_url = `${Configure.getIpPeticiones()}` + "products/";
    this.http.get(ProductsService.base_url + "get/all").pipe(map(Configure.extractData), catchError(Configure.handleError)).subscribe(data => {
      for (let product of data) {
        ProductsService.products.push(new Product(product.id, product.price, product.imageUrl, product.name, product.description, product.specials));
      }
    }
    );
  }

  static remove(p: string): void {
    let id: number = parseInt(p)
    console.log(this.products);
    console.log("Remover", p);
    for (let i = 0; i < ProductsService.products.length; ++i) {
      if (ProductsService.products[i].id == id) {
        ProductsService.products.splice(i, 1);
        return;
      }
    }
  }

  static insertProduct(id: number, price: number, image: String, nombre: String, descripcion: String, specials: String): Boolean {
    ProductsService.products.push(new Product(id, price, image, nombre, descripcion, specials));
    return true;
  }

  static getProductById(idS: string): Product {
    let id = parseInt(idS);
    for (let product of ProductsService.products) {
      if (product.id == id) {
        return product;
      }
    }
    return Product.Empty();
  }
}
