import { Component, OnInit } from '@angular/core';
import { User } from '../models/usuario/user.model';
declare let $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() {}

  getUser():String{
    let ret=NavbarComponent.getCookie("username");
    return (ret.length>0)?ret:"No user";
  }

  logout():void{
    NavbarComponent.createCookie("user", "");
    NavbarComponent.createCookie("username", "");
    NavbarComponent.createCookie("password", "");
    $("#logout").addClass("disabled");
  }

  static getCookie(name: String): String{
    let ret="";
    let cname = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length && ret==""; i++){
        let c = ca[i];
        while(c.charAt(0) == ' '){
            c = c.substring(1);
        }
        if(c.indexOf(cname) == 0){
            ret=c.substring(cname.length, c.length);
        }
    }
    return ret;
  }

  static createCookie(name: String, data: String):void{
    let cookie = name+"="+data;
    document.cookie = cookie;
  }

  ngOnInit(): void {    
  }

  static changeUser(user:User): String{
    this.createCookie("user", JSON.stringify(user));
    this.createCookie("username", user.email);
    this.createCookie("password", user.password);
    $("#logout").removeClass("disabled");
    return this.getCookie("username");
  }
}
