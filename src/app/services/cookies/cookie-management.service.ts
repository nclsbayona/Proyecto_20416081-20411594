import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieManagementService {

  constructor() { }
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
}
