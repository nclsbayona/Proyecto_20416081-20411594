import { Bill_Element } from "../bills/bill.model";
import { Product } from "../product/product.model";
import { User } from "../user/user.model";

export class Cart{
    removeElement(element: Product, amount: number) {
      for (let i=0; i<this.elements.length; i++){
        let billElement=this.elements[i];
        if (billElement.product.name==element.name){
          if (billElement.total>=amount)
            billElement.total-=amount;
          if (billElement.total==0)
            this.elements.splice(i,1);
          return;
        }
      }
    }

    elements: Bill_Element[] = [];
    owner: User;

    constructor(owner:User){
        this.owner=owner;
    }

    addElement(element: Product, amount: number){
        for (let i = 0; i < this.elements.length; i++) {
            if(this.elements[i].product.id == element.id){
                this.elements[i].total += amount;
                return;
            }
        }
        this.elements.push(new Bill_Element(amount, element));
    }
}