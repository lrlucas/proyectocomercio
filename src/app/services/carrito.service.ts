import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public productos = [];
  public total_carrito = 0;
  public precios = [];

  constructor(private storage: Storage, public toastController: ToastController) {
      // this.storage.get('productos').then( (data: any) => {
      //     if (data === null) {
      //         console.log(data);
      //     } else {
      //         console.log(data)
      //         console.log(this.productos.length)
      //         this.productos = data
      //         console.log(this.productos)
      //     }
      // });
      //
      // this.storage.length().then( result => {
      //     this.sizeCarrito = result;
      // });
  }

  public async addCarrito(producto: any) {
      const result = this.productos.indexOf(producto);
      if (result === -1) {
          this.productos.push(producto);
          this.precios.push(Number(producto.precio))
          // this.saveLocalStorageCarrito();
          this.precioProductos();
          const toast = await this.toastController.create({
              message: 'El producto se añadio al carrito',
              duration: 1800
          });
          toast.present();
      } else {
          const toast = await this.toastController.create({
              message: 'El producto ya se encuentra en el carrito',
              duration: 1800
          });
          toast.present();
      }


  }

  public precioProductos() {
      const add = (a, b) => a + b;
      this.total_carrito = this.precios.reduce(add, 0);
  }

  public removeCarrito(id: any) {
      for (let i of this.productos) {
          if (id === i.idProducto) {
              let posicion = this.productos.indexOf(i);
              this.productos.splice(posicion, 1);
              this.precios.splice(posicion, 1)
              this.precioProductos();
          }
      }
  }

  saveLocalStorageCarrito() {
      this.storage.set('productos', this.productos);
  }

  public async MostrarToast(mensaje: string) {
      const toast = await this.toastController.create({
          message: mensaje,
          duration: 1800
      });
      toast.present();
  }

}
