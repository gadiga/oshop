import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  
  shoppingCartInstance: ShoppingCart;
  cartSubscription: Subscription;
  shopCart;

  constructor(private shoppingCart: ShoppingCartService) { }

  ngOnInit() {
    this.shoppingCartInstance = new ShoppingCart();      
    this.getShoppingCart();
  }

  async getShoppingCart () {
    let cart = await (this.shoppingCart.getCart());
    this.cartSubscription = cart.snapshotChanges().subscribe(values=>{
      this.shoppingCartInstance.getTotalItemCountJson(values.payload.toJSON()["items"]);
      this.shopCart=values.payload.val().items      
    })
  }

  ngOnDestroy () {
    this.cartSubscription.unsubscribe();
  }

}
