import { Component, OnInit } from '@angular/core';
import { User } from '../models/usuario/user.model';
import { NavbarComponent } from '../navbar/navbar.component';
import { AccountManagementService } from '../services/account/account-management.service';
declare let $:any;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  account_service=AccountManagementService;
  constructor() { 
    this.account_service.poblate()
  }

  ngOnInit(): void {
  }

  login(): void{
    let email: String=$("#exampleInputEmail1").val()
    let pwd: String=$("#exampleInputPassword1").val()
    let user: User|null=this.account_service.login(email, pwd);
  }
}
