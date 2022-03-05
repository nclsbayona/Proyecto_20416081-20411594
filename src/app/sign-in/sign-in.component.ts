import { Component, OnInit } from '@angular/core';
import { AccountManagementService } from '../services/account/account-management.service';
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

}
