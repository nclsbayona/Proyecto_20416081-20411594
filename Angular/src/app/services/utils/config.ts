import { throwError } from "rxjs/internal/observable/throwError";

export class Configure {
    private static config: any = null;
    private static status: number;
  
    public static init() {
      return Configure.loadConfigure('./assets/constantes/config.json');
    }
  
    public static loadConfigure(filePath: string): Promise<any> {
      console.log("Cargando configuracion");
      const request = new XMLHttpRequest();
      request.open('GET', filePath, false);
      request.send();
      if (request.status === 200)
        this.config = JSON.parse(request.responseText);
      this.status = request.status;
      return new Promise((resolve, reject) => {
        if (this.status === 200) {
          console.log("Config init called");
          setTimeout(() => {
            console.log("Config init done");
            resolve(true);
          }, 6000);
        } else {
          reject(false);
        }
      });
    }
  
    public static getIpPeticiones(): string {
      return `${this.config.IP}`;
    }

    public static extractData(res: Response|any) {
        const body = res;
        return body || {};
    }

    public static handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const err = error || '';
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return throwError(()=>new Error(errMsg));
    }
  }