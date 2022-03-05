import { Component, OnInit } from '@angular/core';
import { User } from '../models/usuario/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private user: User|null=null;
  constructor() { }

  getUser(): String{
    return (this.user==null)?"No user":this.user?.email;
  }

  ngOnInit(): void {
  }

  changeUser(user:User): void{
    this.user=user;
  }
}
