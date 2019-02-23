import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CarritoPage } from './carrito.page';
import {PayPal} from '@ionic-native/paypal/ngx';

const routes: Routes = [
  {
    path: '',
    component: CarritoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CarritoPage],
  providers: [
    PayPal
  ]
})
export class CarritoPageModule {}
