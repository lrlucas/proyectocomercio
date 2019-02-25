import { Component, OnInit } from '@angular/core';
import {CarritoService} from '../services/carrito.service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
    public productos = [];

    public Err: string = '';
    public Mensaje: any;

    public botonPaypal = false;

  constructor(public carritoService: CarritoService,
              private payPal: PayPal,
              public navCtrl: NavController) { }

  ngOnInit() {
      this.productos = this.carritoService.productos;
      this.BotonPaypal();
  }

  public BotonPaypal() {
      if (this.productos.length > 0) {
          this.botonPaypal = true;
      } else {
          this.botonPaypal = false;
      }
  }

  public borrarProducto(producto) {
      this.carritoService.removeCarrito(producto.idProducto);
      this.BotonPaypal();
  }


    public MaysPrimera(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    public comprar() {
        this.payPal.init({
            PayPalEnvironmentProduction: '',
            PayPalEnvironmentSandbox: 'AcaUqITFUu3RSN9HG0Goh9yY09k9lX14rjkVj2ygxbNy7uXgOyvKOq-SUZy0CLwy0hvEFoQs9zFk1lT1'
        }).then(() => {
            // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
            this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
                // Only needed if you get an "Internal Service Error" after PayPal login!
                // payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
            })).then(() => {
                const payment = new PayPalPayment(
                    this.carritoService.total_carrito.toString(),
                    'USD',
                    'Pago realizado correctamente - Proyecto de Comercio electronico',
                    'sale');
                this.payPal.renderSinglePaymentUI(payment).then((pago) => {
                    if (pago) {
                        this.carritoService.MostrarToast('Pago Realizado correctamente');
                        console.log('pago');
                        console.log(pago);
                        this.Mensaje = pago;
                        this.carritoService.productos.length = 0;
                        this.carritoService.precios.length = 0;
                        this.carritoService.total_carrito = 0;
                        this.navCtrl.navigateForward(`/home`);
                    }
                    // Successfully paid
                    // Example sandbox response
                    //
                    // {
                    //   "client": {
                    //     "environment": "sandbox",
                    //     "product_name": "PayPal iOS SDK",
                    //     "paypal_sdk_version": "2.16.0",
                    //     "platform": "iOS"
                    //   },
                    //   "response_type": "payment",
                    //   "response": {
                    //     "id": "PAY-1AB23456CD789012EF34GHIJ",
                    //     "state": "approved",
                    //     "create_time": "2016-10-03T13:33:33Z",
                    //     "intent": "sale"
                    //   }
                    // }
                }, (err) => {
                    console.log(err);
                    this.Err = err;
                    this.carritoService.MostrarToast(err);
                });
            }, (err) => {
                console.log(err);
                this.Err = err;
                // Error in configuration
                this.carritoService.MostrarToast(err);
            });
        }, (err) => {
            console.log(err);
            this.Err = err;
            this.carritoService.MostrarToast(err);
            // Error in initialization, maybe PayPal isn't supported or something else
        });
    }
}
