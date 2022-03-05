export class User{
    email: String;
    password: String;
    constructor(email: String, password: String){
        this.email=email;
        this.password=password;
    }
    //Funcionalidades del usuario
}

export class Admin extends User{
    constructor(email: String, password: String){
        super(email, password);
    }
    //Funcionalidades del admin
}