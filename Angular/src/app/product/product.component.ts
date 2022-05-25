import { Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../models/product/product.model';
import { ProductsService } from '../services/products/products.service';
import { AccountManagementService } from '../services/account/account-management.service';
import { CartManagementService } from '../services/cart/cart-management.service';
import { CookieManagementService } from '../services/cookies/cookie-management.service';

declare let $: any
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  cookieManagementService: CookieManagementService = CookieManagementService;
  @Input()
  product: Product = Product.Empty();
  
  userLogged(): boolean {
    return CookieManagementService.getCookie("username").length > 0;
  }

  isAdmin(): boolean {
    let ret = false;
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
    return ret;
  }

  getPrice(): String {
    return "$" + this.product.price.toString();
  }
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
    return this.product.specials;
  }

  constructor( private products: ProductsService, private accountManagementService: AccountManagementService, private cartManagementService: CartManagementService) {
    const getID = (): string =>
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
        $('.cart' + getID()).on("click",  () => {
          cartManagementService.addToCart(products.getProductById(getID()), 1, CookieManagementService.getCookie("username"));
        })
        $('.remove' + getID()).on("click", function () {
          console.log("Clicked on remove " + getID());
          products.remove(getID());
        })
      })
  }
  ngOnInit(): void {
  }
}
