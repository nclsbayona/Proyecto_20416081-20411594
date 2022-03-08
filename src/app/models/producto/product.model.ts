export class Product{
    id: number;
    imageUrl: String;
    name: String;
    description: String;
    specials:String; //Special classes
    constructor(id:number, image: String, nombre: String, descripcion: String, specials: String){
        this.id=id;
        this.imageUrl=image;
        this.name=nombre;
        this.description=descripcion;
        this.specials=""
        let classes= specials.split(" ")
        for (let clas of classes)
            if (clas!="")
                this.specials+=clas+'-'+id.toString()+" ";
    }
    static Empty(){
        return new Product(0,"","","","");
    }
}