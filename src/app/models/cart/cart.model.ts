import { Bill_Element } from "../bills/bill.model";
import { User } from "../user/user.model";

export class Cart{

    elements: Bill_Element[] = [];
    owner: User;

    constructor(owner:User){
        this.owner=owner;
    }

    addElement(element: Bill_Element){
        for (let i = 0; i < this.elements.length; i++) {
            if(this.elements[i].product.id == element.product.id){
                this.elements[i].total += element.total;
                return;
            }
        }
        this.elements.push(element);
    }
}