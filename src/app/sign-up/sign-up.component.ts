import { Component, OnInit } from '@angular/core';
import { AccountManagementService } from '../services/account/account-management.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  account_service=AccountManagementService;
  password1?: String;
  password2?: String;
  constructor() {}

  checkPasswords():void{
    this.account_service.checkPasswordsSame(this.password1!,this.password2!);    
  }

  ngOnInit(): void {
  }

}
