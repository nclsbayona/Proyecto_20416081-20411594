import { Injectable } from '@angular/core';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { Admin, User } from '../../models/user/user.model';
declare let $: any
@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {
  static users: User[] = [];
  static poblate() {
    if (AccountManagementService.users.length == 0) {
      AccountManagementService.users.push(new Admin("abril@cano.com", "@bril123"));
      AccountManagementService.users.push(new User("n@bayona.com", "Hola_1"));
    }
  }

  static printUsers():void{
    console.log(this.users)
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
    this.printUsers()
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
      console.log(NavbarComponent.changeUser(u));
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
