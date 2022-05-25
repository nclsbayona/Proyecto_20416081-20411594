import { Component, OnInit } from '@angular/core';
import { AccountManagementService } from '../services/account/account-management.service';

declare let $: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  //account_service = AccountManagementService;
  password1?: String;
  password2?: String;

  constructor(private accounts: AccountManagementService) { }


  login(): void {
    let email: String = $("#exampleInputEmail1").val();
    const userData ={
      email: $("#exampleInputEmail1").val(),
      password: this.password1!
    }
    if (this.accounts.checkPasswordsSame(this.password1!, this.password2!)) {
      this.accounts.addUser(userData);
      //   console.log(this.account_service.login(email, this.password1!));
      // else
      //   console.log("User already exists");
    }
  }

  ngOnInit(): void {
  }

}
