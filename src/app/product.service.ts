import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create (product) {
    return this.db.list('/products').push(product)
  }

  update (productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete (productId) {
    return this.db.object('/products/' + productId).remove();
  }

  get products() {
    return this.db.list('/products').snapshotChanges();
  }

  getProduct(id) {
    return this.db.object('/products/' + id).snapshotChanges();
  }
}
