import { Component, OnInit } from '@angular/core';
import { Bill_Element } from '../models/bills/bill.model';
import { Cart } from '../models/cart/cart.model';
import { Product } from '../models/product/product.model';
import { AccountManagementService } from '../services/account/account-management.service';
import { CartManagementService } from '../services/cart/cart-management.service';
import { CookieManagementService } from '../services/cookies/cookie-management.service';
import { ProductsService } from '../services/products/products.service';
declare let $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart | null = null;
  idSelectedProduct: string = "";
  selectedProduct: Product = CartComponent.getProductById(this.idSelectedProduct);

  productData = {
    id: this.selectedProduct.id,
    nombre: this.selectedProduct.name,
    precio: this.selectedProduct.price,
    descripcion: this.selectedProduct.description,
    especiales: this.selectedProduct.specials,
    UrlImg: this.selectedProduct.imageUrl
  }

  ngOnInit(): void {
  }

  getCartElements(): Bill_Element[] {
    this.updateCart();
    return this.cart!.elements;
  }

  removeCart(): void {
    this.cart = null;
  }

  updateCart(): void {
    this.cart = CartManagementService.getSpecificUserCart(AccountManagementService.getCurrentUser()!);
  }

  payCart(): void {
    CartManagementService.payCart(AccountManagementService.getCurrentUser()!);
    this.removeCart();
    this.updateCart();
  }

  getTotal(): number {
    return this.cart!.getTotal();
  }

  isAdmin(): boolean {
    let ret = false;
    if (CookieManagementService.getCookie("username").length > 0) {
      let cname = "user=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length && !ret; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
          ret = JSON.parse(c.substring(cname.length, c.length)).admin ? true : false;
        }
      }
    }
    return ret;
  }
  products = ProductsService;

  static remove(p: string) {
    let id: number = parseInt(p)
    console.log("Remover", p);
    for (let i = 0; i < ProductsService.products.length; ++i) {
      if (ProductsService.products[i].id == id) {
        ProductsService.products.splice(i, 1);
        return;
      }
    }
  }

  getProducts(): Product[] {
    console.log("Get products desde cart", this.products.products);
    return this.products.products;
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

  selectChangeHandler(event: any) {
    this.idSelectedProduct = event.target.value;
    console.log("Id seleccionado: ", this.idSelectedProduct)
    this.selectedProduct = CartComponent.getProductById(this.idSelectedProduct);

    this.productData = {
      id: this.selectedProduct.id,
      nombre: this.selectedProduct.name,
      precio: this.selectedProduct.price,
      descripcion: this.selectedProduct.description,
      especiales: this.selectedProduct.specials,
      UrlImg: this.selectedProduct.imageUrl
    }
  }

  static insertProduct(id: number, price: number, image: String, nombre: String, descripcion: String, specials: String): Boolean {
    ProductsService.products.push(new Product(id, price, image, nombre, descripcion, specials));
    return true;
  }

  Create(): boolean {
    let id: number = $("#id").val()
    let nombre: String = $("#nombre").val()
    let precio: number = $("#precio").val()
    let especiales: String = $("#especiales").val()
    let descripcion: String = $("#descripcion").val()
    let imagen: String = $("#img").val()
    if (CartComponent.getProductById(id.toString()).id == 0) {
      console.log("ID: ", CartComponent.getProductById(id.toString()).id)
      CartComponent.insertProduct(id, precio, imagen, nombre, descripcion, especiales)
      return true;
    } else {
      alert("El ID ingresado ya existe")
      return false;
    }

  }

  UpdateProduct(): void {
    console.log("selected Product", this.selectedProduct)
    CartComponent.remove(this.idSelectedProduct)
    this.Create()
  }



}
