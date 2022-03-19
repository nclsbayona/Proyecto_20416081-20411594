import { Injectable } from '@angular/core';
import { Cart } from 'src/app/models/cart/cart.model';
import { User } from 'src/app/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class CartManagementService {

  static carts:Cart[] = [];

  constructor() { 
  }

  static addCart(cart:Cart):void{
    CartManagementService.carts.push(cart);
  }

  static removeCartByOwner(owner:User):void{
    for (let i=0; i<CartManagementService.carts.length; i++){
      let element=CartManagementService.carts[i];
      if(element.owner.email==owner.email){
        CartManagementService.carts.splice(i,1);
        return;
      }
    }
  }

  private static getCartByOwner(owner:User):Cart|null{
    let cart:Cart|null = null;
    for (let i=0; i<CartManagementService.carts.length; i++){
      let element=CartManagementService.carts[i];
      if(element.owner.email==owner.email){
        cart = element;
      }
    }
    return cart;
  }

  static getSpecificUserCart(user:User):Cart{
    let cart:Cart|null = this.getCartByOwner(user);
    if (!cart)
      cart=new Cart(user);
    CartManagementService.carts.push(cart);
    return cart;
  }
}
