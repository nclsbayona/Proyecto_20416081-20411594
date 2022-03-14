import { Product } from "../product/product.model";

export class Bill{
    elements: Bill_Element[] = [];
    date: Date;
    id: number;

    constructor(id: number, date: Date){
        this.id=id;
        this.date=date;
    }

    addElement(element: Bill_Element){
        this.elements.push(element);
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