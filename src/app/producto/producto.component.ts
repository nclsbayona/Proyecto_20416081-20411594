import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/producto/product.model';

declare let $: any
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  @Input()
  product: Product=Product.Empty();
  getImageUrl(): String {
    return this.product.imageUrl;
  }

  getName(): String {
    return this.product.name;
  }

  getDescription(): String {
    return this.product.description;
  }
  
  getSpecials(): String {
    console.log(this.product.specials)
    return this.product.specials;
  }

  constructor() {
    const getID = (): String =>
      this.product.id.toString();
    $(document).ready(
      () => {
        let popup_offer = "<div class='" + getID() + " not-visible offer-container text-center col-3'><div class='center-block popup text-center'><h2>Este producto esta en oferta</h2></div></div>";
        let popup_new = "<div class='" + getID() + " not-visible new-container text-center col-3'><div class='center-block popup text-center'><h2>Este producto es nuevo</h2></div></div>";
        let popup_exclusive = "<div class='" + getID() + " not-visible exclusive-container text-center col-3'><div class='center-block popup text-center'><h2>Este producto es exclusivo</h2></div></div>";
        $('.offer-' + getID()).prepend(popup_offer);
        $('.new-' + getID()).prepend(popup_new);
        $('.exclusive-' + getID()).prepend(popup_exclusive);
        $('.offer-' + getID()).mouseenter(function () {
          $("." + getID()).removeClass("not-visible");
        })
        $('.new-' + getID()).mouseenter(function () {
          $("." + getID()).removeClass("not-visible");
        })
        $('.exclusive-' + getID()).mouseenter(function () {
          $("." + getID()).removeClass("not-visible");
        })
        $('.offer-' + getID()).mouseleave(function () {
          $("." + getID()).addClass("not-visible");
        })
        $('.new-' + getID()).mouseleave(function () {
          $("." + getID()).addClass("not-visible");
        })
        $('.exclusive-' + getID()).mouseleave(function () {
          $("." + getID()).addClass("not-visible");
        })
      })
  }
  ngOnInit(): void {
  }
}
