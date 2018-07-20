import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ThenableReference } from '@firebase/database-types';
import { Product } from './models/product.model';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { SubjectSubscriber } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private createCart(): ThenableReference {
    return this.db.list('/shopping-carts').push({
      createdDate: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId() {

    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.createCart();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/'+cartId + '/items/' + product.key);
    let subsc = item$.snapshotChanges().subscribe(item=> {
      subsc.unsubscribe();
      if (item.key) {
        item$.update({quantity: item.payload.val().quantity+1})
      } else {
        item$.set({product: product, quantity: 1})
      }
    });
  }
}


