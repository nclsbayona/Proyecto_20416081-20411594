export class Product {
    id: number;
    price: number;
    imageUrl: String;
    name: String;
    description: String;
    specials: String; //Special classes
    constructor(id: number, price: number, image: String, nombre: String, descripcion: String, specials: String) {
        this.id = id;
        this.price = price;
        this.imageUrl = image;
        this.name = nombre;
        this.description = descripcion;
        this.specials = ""
        let classes = specials.split(" ")
        for (let clas of classes)
            if (clas != "")
                this.specials += clas + '-' + id.toString() + " ";
    }
    static Empty() {
        return new Product(0, 0, "", "", "", "");
    }
}