import { Component, OnInit } from '@angular/core';
import { User } from '../models/usuario/user.model';
import { AccountManagementService } from '../services/account/account-management.service';

declare let $: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  account_service = AccountManagementService;
  password1?: String;
  password2?: String;
  constructor() {
    this.account_service.poblate();
  }

  login(): void {
    let email: String = $("#exampleInputEmail1").val();
    if (this.account_service.checkPasswordsSame(this.password1!, this.password2!)) {
      if (this.account_service.addNewUser(email, this.password1!, false)) {
        let user: User | null = this.account_service.login(email, this.password1!);
      }
    }
  }

  ngOnInit(): void {
  }

}
