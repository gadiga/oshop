import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private db: AngularFireDatabase, private shoppingCart: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCart.clearCart();
    return result;
  }

  async getOrderFromId(orderId: string) {
    let orderInfo: any;
    let order$ = await this.db.list('/orders/' + orderId).valueChanges();
    return order$;
  }
}
