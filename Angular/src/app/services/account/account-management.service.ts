import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { Admin, User } from '../../models/user/user.model';
import { CookieManagementService } from '../cookies/cookie-management.service';
import { Configure } from '../utils/config';
declare let $: any
@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {
  static users: User[] = [];
  static base_url: string = "";

  constructor(private http: HttpClient) {
  }

  getUsers() {
    AccountManagementService.base_url = `${Configure.getIpPeticiones()}` + "accounts/";
    this.http.get(AccountManagementService.base_url + "get/all").pipe(map(Configure.extractData), catchError(Configure.handleError)).subscribe(data => {
      for (let user of data) {
        if (user.admin)
        AccountManagementService.users.push(new Admin(user.email, user.password));
        else
        AccountManagementService.users.push(new User(user.email, user.password));
      }
    }
    );
  }

  static getCurrentUser(): User | null {
    return AccountManagementService.findUser(CookieManagementService.getCookie("username"));
  }

  static orderUsers(): void {
    AccountManagementService.users.sort((a, b) => a.strcmp(b));
  }

  static checkPasswordsSame(password1: String, password2: String): boolean {
    if (password1 == password2)
      return true;
    else
      return false;
  }

  private static findUser(email: String): User | null {
    this.orderUsers()
    let u: User | null = null;
    let start: number = 0;
    let end: number = this.users.length - 1;
    let mid: number;
    let a: User | null;
    while (start <= end && u == null) {
      mid=Math.floor((start + end) / 2);
      a = AccountManagementService.users[mid];
      if (a.email == email)
        u = a;
      else if (a.email < email)
        start = mid + 1;
      else
        end = mid -1;
    }
    return u;
  }

  static login(email: String, password: String): User | null {
    let u: User | null = this.findUser(email);
    let but = $(".btn");
    if (u?.password != password)
      u = null;
    if (u != null) {
      but.removeClass("btn-danger");
      but.addClass("btn-success");
    }
    else {
      but.removeClass("btn-success");
      but.addClass("btn-danger");
    }
    if (u!=null){
      NavbarComponent.changeUser(u);
      $("#bills").removeClass("disabled");
      $("#cart").removeClass("disabled");
    }
    return u;
  }

  static addUser(email: String, password: String): boolean {
    return this.addNewUser(email, password, false);
  }

  private static addNewUser(email: String, password: String, admin: boolean): boolean {
    if (!this.findUser(email)) {
      if (admin)
        AccountManagementService.users.push(new Admin(email, password));
      else
        AccountManagementService.users.push(new User(email, password));
      this.orderUsers();
      return true;
    } else return false;
  }

}
