import { Component, OnInit } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {CarritoService} from '../services/carrito.service';
import {ProductoService} from '../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  public producto = {
    nombre: '',
    descripcion: '',
    precio: '',
    idProducto: ''
  };

  constructor(public toastController: ToastController,
              private route: ActivatedRoute,
              public carritoService: CarritoService,
              public navCtrl: NavController,
              public productoService: ProductoService) { }

  ngOnInit() {
    this.producto.idProducto = this.route.snapshot.paramMap.get('id');
    this.productoService.getProductobyId(this.producto.idProducto).subscribe( (data: any) => {
      this.producto.nombre = data[0].nombre;
      this.producto.precio = data[0].precio;
      this.producto.descripcion = data[0].descripcion;
      this.producto.idProducto = data[0].idProducto;
    });
  }

  async addCarrito() {
    this.carritoService.addCarrito(this.producto);
  }

  public verCarrito() {
    this.navCtrl.navigateForward(`/carrito`);
  }

  public MaysPrimera(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  public irAlCarrito() {
    this.carritoService.addCarrito(this.producto);
    this.navCtrl.navigateForward(`/carrito`);
  }


}
