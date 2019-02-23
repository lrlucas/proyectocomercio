import { Component, OnInit } from '@angular/core';
import {CarritoService} from '../services/carrito.service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
    public productos = [];

    public Err: string = '';
    public Mensaje: any;

  constructor(public carritoService: CarritoService,
              private payPal: PayPal) { }

  ngOnInit() {
      this.productos = this.carritoService.productos;
  }

  public borrarProducto(producto) {
      this.carritoService.removeCarrito(producto.idProducto);
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
                const payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
                this.payPal.renderSinglePaymentUI(payment).then((pago) => {
                    console.log('pago');
                    console.log(pago);
                    this.Mensaje = pago;
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
                    // Error or render dialog closed without being successful
                });
            }, (err) => {
                console.log(err);
                this.Err = err;
                // Error in configuration
            });
        }, (err) => {
            console.log(err);
            this.Err = err;
            // Error in initialization, maybe PayPal isn't supported or something else
        });
    }
}
