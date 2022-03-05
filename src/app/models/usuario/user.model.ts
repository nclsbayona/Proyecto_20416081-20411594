export class User{
    email: String;
    password: String;
    constructor(email: String, password: String){
        this.email=email;
        this.password=password;
    }
    strcmp (user: User):number{
        return (( this.email > user.email ) ? 1 : (this.email < user.email ) ? -1 : 0 );}
    //Funcionalidades del usuario
}

export class Admin extends User{
    constructor(email: String, password: String){
        super(email, password);
    }
    //Funcionalidades del admin
}