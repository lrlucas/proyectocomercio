import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  // private url: string = 'http://localhost:9091';
  private url: string = 'http://192.168.0.12:9091';
  public connect = false;

  constructor(private http: HttpClient) { }

  public getProducto() {
    const url = `${this.url}/api/public/producto`;
    return this.http.get(url).pipe(map( (data: any) => {
      this.connect = true;
      return data;
    }));
  }

  public getProductobyId(id: any) {
    const url = `${this.url}/api/public/producto/${id}`;
    return this.http.get(url).pipe(map( (data: any) => {
      this.connect = true;
      return data;
    }));
  }
}
