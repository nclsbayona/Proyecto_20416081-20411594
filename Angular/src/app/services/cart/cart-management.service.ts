import { Injectable } from '@angular/core';
import { Cart } from 'src/app/models/cart/cart.model';
import { Product } from 'src/app/models/product/product.model';
import { User } from 'src/app/models/user/user.model';
import { BillManagementService } from '../bills/bill-management.service';
import { CookieManagementService } from '../cookies/cookie-management.service';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Configure } from '../utils/config';

@Injectable({providedIn: 'root'})
export class CartManagementService {

  addToCart(product: any, amount: number, user: String) {
    return this.http.post(
      `${Configure.getIpPeticiones()}/cart/add`, product ).pipe(
          map(Configure.extractData),
          catchError(Configure.handleError)
      );
  }

  static carts: Cart[] = [];
  static base_url: string = "";

  constructor(private http: HttpClient) {
  }

  getCarts(){
    CartManagementService.base_url = `${Configure.getIpPeticiones()}` + "cart/";
    this.http.get(CartManagementService.base_url + "get/all").pipe(map(Configure.extractData), catchError(Configure.handleError)).subscribe(data => {
      for (let c of data) {
        let create:Cart=new Cart(c.user);
        for (let element of c.billElements) {
          create.addElement(element.product, element.total);
        }
        CartManagementService.carts.push(create);
      }
    });
  }

  static removeElementFromUserCart(user: User, element: Product, amount: number): void {
    //let cart = this.getCartByOwner(user);
    // if (cart == null)
    //   return;
    // cart.removeElement(element, amount);
  }

  addCart(cart: Cart) {
    //CartManagementService.carts.push(cart);
    return this.http.post(
      `${Configure.getIpPeticiones()}/cart/create`, cart ).pipe(
          map(Configure.extractData),
          catchError(Configure.handleError)
      );
  }

  removeCartByOwner(owner: User) {
    return this.http.post(
      `${Configure.getIpPeticiones()}/cart/delete`, owner ).pipe(
          map(Configure.extractData),
          catchError(Configure.handleError)
      );
  }

  payCart(user: User) {
    return this.http.post(
      `${Configure.getIpPeticiones()}/cart/pay`, user).pipe(
          map(Configure.extractData),
          catchError(Configure.handleError)
      );
  }

  getCartByOwner(owner: User) {
    return this.http.post(
      `${Configure.getIpPeticiones()}/cart/get`, owner).pipe(
          map(Configure.extractData),
          catchError(Configure.handleError)
      );
    
  }

  static getSpecificUserCart(user: String): void {
    /* let cart: Cart | null = this.getCartByOwner(user);
    if (CookieManagementService.getCookie("user") != null) {
      if (cart==null){
        cart = new Cart(user);
        CartManagementService.carts.push(cart);
      }
    }
    return cart!; */
  }
}