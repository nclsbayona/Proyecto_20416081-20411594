import { Injectable } from '@angular/core';
import { Admin,User } from '../../models/usuario/user.model';
declare let $: any 
@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {
  static users: User[]=[];
  static poblate() { 
    if (this.users.length==0){
    this.users.push(new Admin("abril@cano.com", "@bril123"));
    this.users.push(new User("n@bayona.com", "Hola_1"));
    this.users.sort((a,b)=>a.strcmp(b));
    }
  }
  static checkPasswordsSame(password1:String, password2:String):void{
    console.log("Hola")
    let but=$(".btn");
    if (password1==password2){
      but.removeClass("btn-danger");
      but.addClass("btn-success");
    }else{
      but.removeClass("btn-success");
      but.addClass("btn-danger");
    }
  }
  private static findUser(email:String):User|null{
    let u: User|null=null;
    let start:number=0;
    let end: number=this.users.length-1;
    let mid:number=Math.floor((start+end)/2);
    let a:User|null;
    while (start<end && u==null){
      a=this.users[mid];
      if (a.email==email)
        u=a;
      else if (a.email>email)
        start=mid+1;
      else
        end=mid-1;
    }
    return u;
  }

  static login(email:String, password:String):User|null{
    let u:User|null=this.findUser(email);
    if (u?.password!=password)
      u=null;
    return u;
  }
}
