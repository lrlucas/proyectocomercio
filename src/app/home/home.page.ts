import {Component, OnInit} from '@angular/core';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import {NavController} from '@ionic/angular';
import {CarritoService} from '../services/carrito.service';
import {ProductoService} from '../services/producto.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public productos = [];

  constructor(private photoViewer: PhotoViewer,
              public navCtrl: NavController,
              public carritoService: CarritoService,
              public productoService: ProductoService) {

  }

  ngOnInit(): void {
    this.productoService.getProducto().subscribe( (data: any) => {
      this.productos = data.reverse();
      console.log(this.productos);
    });
  }

  public verImagen(id: any) {
    // este pulgin no funciona
    // this.photoViewer.show('../../assets/img/foto1.jpg', 'Titulo de la imagen', { share: true, copyToReference: true, closeButton: true });
    console.log('click en el producto');
    this.navCtrl.navigateForward(`/producto/${id}`);
  }

  public verCarrito() {
    this.navCtrl.navigateForward(`/carrito`);
  }


  public MaysPrimera(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }




}
