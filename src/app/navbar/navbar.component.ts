import { Component, OnInit } from '@angular/core';
import { User } from '../models/user/user.model';
import { CookieManagementService } from '../services/cookies/cookie-management.service';
declare let $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() {
    if (CookieManagementService.getCookie("username").length > 0) {
      $(document).ready(function () {
        $("#bills").removeClass("disabled");
        $("#cart").removeClass("disabled");
      });
    }
  }

  getUser(): String {
    let ret = CookieManagementService.getCookie("username");
    return (ret.length > 0) ? ret : "No user";
  }

  logout(): void {
    CookieManagementService.deleteCookie("user");
    CookieManagementService.deleteCookie("username");
    CookieManagementService.deleteCookie("password");
    $("#bills").addClass("disabled");
    $("#cart").addClass("disabled");
  }

  isLogged(): boolean {
    return (CookieManagementService.getCookie("username").length > 0);
  }

  ngOnInit(): void {
  }

  static changeUser(user: User): String {
    CookieManagementService.createCookie("user", JSON.stringify(user));
    CookieManagementService.createCookie("username", user.email);
    CookieManagementService.createCookie("password", user.password);
    return CookieManagementService.getCookie("username");
  }
}
