import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
declare let $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products =  ProductsService;
  constructor() {}
  ngOnInit(): void {
  }

  isAdmin(): boolean{
    let ret=false;
    let cname = "user=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length && !ret; i++){
        let c = ca[i];
        while(c.charAt(0) == ' '){
            c = c.substring(1);
        }
        if(c.indexOf(cname) == 0){
            JSON.parse(c.substring(cname.length, c.length)).admin?ret=true:ret=false;
        }
    }
    return ret;
  }

  Create():boolean{
    let id: number =$("#id").val()
    let nombre: String=$("#nombre").val()
    let precio: number=$("#precio").val()
    let especiales: String=$("#especiales").val()
    let descripcion: String=$("#descripcion").val()
    let imagen: String=$("#img").val()

    this.products.insertProduct(id,precio,imagen,nombre,descripcion,especiales)
    return true;
  }

}
