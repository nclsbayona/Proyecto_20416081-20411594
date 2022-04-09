import { BillManagementService } from "src/app/services/bills/bill-management.service";
import { Cart } from "../cart/cart.model";
import { Product } from "../product/product.model";
import { User } from "../user/user.model";

export class Bill{

    cart: Cart;
    user: User;
    date: Date;
    id: number;

    constructor(cart: Cart, user: User){
        this.cart=cart;
        this.user=user
        this.date=new Date();
        this.id=BillManagementService.getNextId();
    }

    static Empty(): Bill{
        return new Bill(Cart.Empty(),User.Empty());
    }
}

export class Bill_Element{
    total: number;
    product: Product;
    constructor(total: number, product: Product){
        this.total=total;
        this.product=product;
    }
    static Empty(): Bill_Element{
        return new Bill_Element(0, Product.Empty());
    }
}