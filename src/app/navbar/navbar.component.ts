import { Component, OnInit } from '@angular/core';
import { User } from '../models/usuario/user.model';
declare let $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private static user: User|null=null;
  constructor() {}

  static getUser(): String{
    return (NavbarComponent.user==null)?"No user":NavbarComponent.user?.email;
  }

  getUser():String{
    return NavbarComponent.getUser();
  }

  logout():void{
    $("#logout").addClass("disabled");
    NavbarComponent.user=null;
  }

  ngOnInit(): void {    
  }

  static changeUser(user:User): String{
    NavbarComponent.user=user;
    $("#logout").removeClass("disabled");
    return NavbarComponent.getUser();
  }
}
