import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  countUsers(): number {
    return AccountManagementService.users.length + 1;
  }

  checkPasswordsSame(password1: String, password2: String): boolean {
    if (password1 == password2)
      return true;
    else
      return false;
  }

  async login(email_info: String, password_info: String): Promise<User | null> {
    let response = this.http.post(`${Configure.getIpPeticiones()}`.replace("/api/","/login"), {email:email_info,password:password_info},{ headers: new HttpHeaders({ 'Content-Type': 'application/json',"Accept":'application/json' }) }).pipe(map(Configure.extractData), catchError(Configure.handleError)).subscribe(data => data.authorization);
    console.log(email_info);
    console.log(password_info);
    let u: User | null=null;
    if (response!=null) {
      u = this.findUser(email_info);
      CookieManagementService.createCookie("username", email_info);
      CookieManagementService.createCookie("admin", (u instanceof Admin) ? "true" : "");
    }
    console.log(u);
    let but = $(".btn");
    if (u?.password != password_info)
      u = null;
    if (u != null) {
      but.removeClass("btn-danger");
      but.addClass("btn-success");
    }
    else {
      but.removeClass("btn-success");
      but.addClass("btn-danger");
    }
    if (u != null) {
      NavbarComponent.changeUser(u);
      $("#bills").removeClass("disabled");
      $("#cart").removeClass("disabled");
    }
    return u;
  }
  findUser(email: String): User | null {
    if (AccountManagementService.users.length == 0)
      this.getUsers();
    for (let u of AccountManagementService.users) {
      if (u.email == email)
        return u;
    }
    return null;
  }

  addUser(userData: any) {
    this.addNewUser(userData);
  }

  addNewUser(userData: any) {
    console.log("adding service")
    console.log(userData)
    return this.http.post(
      `${Configure.getIpPeticiones()}accounts/add`, userData ).pipe(
        map(Configure.extractData),
        catchError(Configure.handleError)
      );
  }

}
