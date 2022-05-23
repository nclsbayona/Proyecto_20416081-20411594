import { HttpErrorResponse } from '@angular/common/http';
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
  //products = ProductsService;
  listaProductos: any;

  constructor(private products: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
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

  getProducts(){
    this.products.getProducts().subscribe((response: Product[]) => {
      this.listaProductos = response;
      }
    );
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
    const productData = {
      id: $("#id").val(),
      nombre: $("#nombre").val(),
      precio: $("#precio").val(),
      especiales: $("#especiales").val(),
      descripcion: $("#descripcion").val(),
      imagen: $("#img").val()
    }
    
    if(HomeComponent.getProductById(productData.id).id == 0){
      //console.log("ID: ",getProductById(id.toString()).id)
      this.products.insertProduct(productData).subscribe((respuesta: any) => {}); 
      return true;
    }else{
      alert("El ID ingresado ya existe")
      return false;
    }
  }

}
