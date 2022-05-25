import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
  listaProductos: any;

  constructor(private products_service: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProductById(idS: string): Product {
    this.products_service.getProductById(idS);
    return Product.Empty();
  }

  getProducts(){
    this.products_service.getProducts().subscribe((response: Product[]) => {
      this.listaProductos = response;
      }
    );
  }

  isAdmin(): boolean {
    if (CookieManagementService.getCookie("admin").length > 0)
      return true;
    return false;
  }

  async Create(): Promise<boolean> {
    const productData = {
      id: $("#id").val(),
      nombre: $("#nombre").val(),
      precio: $("#precio").val(),
      especiales: $("#especiales").val(),
      descripcion: $("#descripcion").val(),
      imagen: $("#img").val()
    }
    
    if((await this.getProductById(productData.id)).id == 0){
      //console.log("ID: ",getProductById(id.toString()).id)
      this.products_service.insertProduct(productData).subscribe((respuesta: any) => {}); 
      return true;
    }else{
      alert("El ID ingresado ya existe")
      return false;
    }
  }

}
