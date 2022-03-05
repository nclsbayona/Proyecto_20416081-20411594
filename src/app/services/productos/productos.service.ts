import { Injectable } from '@angular/core';
import { Producto } from '../../models/producto/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  products: Producto[] = [];
  constructor() {
    this.products.push(new Producto(1,"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Frallymundial.net%2Fwp-content%2Fuploads%2F2020%2F07%2FEl-fotografo-toma-imagenes-notables-de-mariposa-en-peligro-de.jpg&f=1&nofb=1", "NO", "Falta la descripcion","offer"));
    this.products.push(new Producto(2,"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Frallymundial.net%2Fwp-content%2Fuploads%2F2020%2F07%2FEl-fotografo-toma-imagenes-notables-de-mariposa-en-peligro-de.jpg&f=1&nofb=1", "Aun no hay un nombre definido, estos e debe a que no hemos pensado en que clase de sacos vamos a vender, por ahora tenemos esto y ya. Ojala les guste, besos XoXo", "Texto sin sentido puesto pata quitarse en una proxima actualizacion  :V tengo la leve sospecha que esto lo traeremos de algun servicio web, por fVIOR alguien diga algo","offer exclusive new"));
    this.products.push(new Producto(3,"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Frallymundial.net%2Fwp-content%2Fuploads%2F2020%2F07%2FEl-fotografo-toma-imagenes-notables-de-mariposa-en-peligro-de.jpg&f=1&nofb=1", "NO", "Falta la descripcion","exclusive new"));
    this.products.push(new Producto(4,"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Frallymundial.net%2Fwp-content%2Fuploads%2F2020%2F07%2FEl-fotografo-toma-imagenes-notables-de-mariposa-en-peligro-de.jpg&f=1&nofb=1", "NO", "Falta la descripcion", "exclusive"));
  }
}
