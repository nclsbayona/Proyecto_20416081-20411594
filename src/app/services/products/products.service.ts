import { Injectable } from '@angular/core';
import { Product } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  static products: Product[] = [];

  static remove(p: string) {
    let id: number=parseInt(p)
    console.log(this.products);
    console.log("Remover",p);
    for (let i=0; i<ProductsService.products.length; ++i) {
      if (ProductsService.products[i].id == id) {
        ProductsService.products.splice(i, 1);
        return;
      }
    }
  }

  static poblate(){
    ProductsService.products.push(new Product(1, 70.000, "https://cdn.shopify.com/s/files/1/0537/9483/2552/products/BC_Nodejs_M2_6d20acb8-d70c-45f5-a14a-5087648b92bf_480x.jpg?v=1614374723", "JS Hoodie", "Muestra tu pasión por JS", "offer"));
    ProductsService.products.push(new Product(2, 75.500, "https://cdn.shopify.com/s/files/1/0537/9483/2552/products/Angular_M2_7483b564-40ed-492a-bd9c-bc577865f4d6_480x.jpg?v=1614874560", "Angular Hoodie", "Si, sé Angular ¿Se nota?", "offer exclusive new"));
    ProductsService.products.push(new Product(3, 80.000, "https://cdn.shopify.com/s/files/1/0537/9483/2552/products/BC_React_M2_bcfd2962-aa3b-4189-b437-e8829c1bd40c_480x.jpg?v=1614374806", "React Hoodie", "Hazte amigo del que reconozca el logo", "exclusive new"));
    ProductsService.products.push(new Product(4, 70.900, "https://cdn.shopify.com/s/files/1/0537/9483/2552/products/AWS_M2_3b05ab76-7294-4974-9d97-77c35d96efa5_480x.jpg?v=1615480109", "AWS Zipper", "Consigue trabajo con solo esta chaqueta", "exclusive"));
    ProductsService.products.push(new Product(5, 90.000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMk4l4j3TxRFusWoGFTiiUUksgqs4Yphd1Cw&usqp=CAU", "Android Hoodie", "Con un bolsillo para que guardes tu iphone", "new"));
    ProductsService.products.push(new Product(6, 80.500, "https://cdn.shopify.com/s/files/1/0537/9483/2552/products/BC_TS_M2_f96c3ef7-e80a-4c84-b009-07f3c345ca86_480x.jpg?v=1614375157", "TypeScript", "Ya estas a otro nivel  ", "new"));
    

  }

  static insertProduct(id: number, price: number, image: String, nombre: String, descripcion: String, specials: String): Boolean{
    ProductsService.products.push(new Product(id, price, image, nombre, descripcion, specials));
    return true;
  }

  static getProductById(idS: string): Product {
    let id=parseInt(idS);
    for (let product of ProductsService.products) {
      if (product.id == id) {
        return product;
      }
    }
    return Product.Empty();
  }
}
