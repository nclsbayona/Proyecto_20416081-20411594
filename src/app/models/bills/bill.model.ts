import { BillManagementService } from "src/app/services/bills/bill-management.service";
import { Cart } from "../cart/cart.model";
import { Product } from "../product/product.model";

export class Bill{

    cart: Cart;
    date: Date;
    id: number;

    constructor(cart: Cart){
        this.cart=cart;
        this.date=new Date();
        this.id=BillManagementService.getNextId();
    }
}

export class Bill_Element{
    total: number;
    product: Product;
    constructor(total: number, product: Product){
        this.total=total;
        this.product=product;
    }
}