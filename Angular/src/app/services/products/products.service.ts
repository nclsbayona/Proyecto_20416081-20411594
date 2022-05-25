import { Injectable } from '@angular/core';
import { Product } from '../../models/product/product.model';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Configure } from '../utils/config';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductsService {

  static products: Product[] = [];
  static base_url: string = "";

  constructor(private http: HttpClient) { 
  }

  getProducts() {
    return this.http.get(`${Configure.getIpPeticiones()}products/get/all`).pipe(
      map(Configure.extractData),
      catchError(Configure.handleError)
    );
    // ProductsService.base_url = `${Configure.getIpPeticiones()}` + "products/";
    // this.http.get(ProductsService.base_url + "get/all").pipe(map(Configure.extractData), catchError(Configure.handleError)).subscribe(data => {
    //   for (let product of data) {
    //     ProductsService.products.push(new Product(product.id, product.price, product.imageUrl, product.name, product.description, product.specials));
    //   }
    // }
    // );
  }

  remove(p: string) {
    let id: number = parseInt(p)
    // console.log(this.products);
    // console.log("Remover", p);
    // for (let i = 0; i < ProductsService.products.length; ++i) {
    //   if (ProductsService.products[i].id == id) {
    //     ProductsService.products.splice(i, 1);
    //     return;
    //   }
    // }
    //ProductsService.base_url = `${Configure.getIpPeticiones()}` + "products/";
    return this.http.delete(`${Configure.getIpPeticiones()}products/delete/${id}`).pipe(
          map(Configure.extractData),
          catchError(Configure.handleError)
      );
  }

  insertProduct(productData: any){
    // ProductsService.products.push(new Product(id, price, image, nombre, descripcion, specials));
    // return true;
    return this.http.post(
      `${Configure.getIpPeticiones()}products/insert`,productData ).pipe(
          map(Configure.extractData),
          catchError(Configure.handleError)
      );
  }

  getProductById(idS: string) {
    let id = parseInt(idS);
    return this.http.get(
      `${Configure.getIpPeticiones()}products/get/${id}`).pipe(
          map(Configure.extractData),
          catchError(Configure.handleError),
      );
  }
}
