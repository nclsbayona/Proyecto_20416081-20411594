import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product/product.model';
import { CookieManagementService } from '../services/cookies/cookie-management.service';
import { ProductsService } from '../services/products/products.service';
declare let $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products = ProductsService;
  constructor() { }
  ngOnInit(): void {
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

  getProducts(): Product[] {
    console.log("Home getProducts",this.products.products)
    return this.products.products;
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

  Create(): boolean {
    let id: number = $("#id").val()
    let nombre: String = $("#nombre").val()
    let precio: number = $("#precio").val()
    let especiales: String = $("#especiales").val()
    let descripcion: String = $("#descripcion").val()
    let imagen: String = $("#img").val()
    if(HomeComponent.getProductById(id.toString()).id == 0){
      //console.log("ID: ",getProductById(id.toString()).id)
      this.products.insertProduct(id, precio, imagen, nombre, descripcion, especiales)
      return true;
    }else{
      alert("El ID ingresado ya existe")
      return false;
    }
  }

}
