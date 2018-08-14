import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-users.model';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart.model';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {

  constructor(public authService: AuthService, private shoppingCart: ShoppingCartService) { }

  appUser: AppUser;
  shoppingCartInstance: ShoppingCart;
  cartSubscription: Subscription;

  ngOnInit() {
    this.authService.appUser$.subscribe(appUser=>this.appUser=appUser);
    this.shoppingCartInstance = new ShoppingCart();          
    this.getShoppingCart();
  }

  logout() {

    this.authService.logout();

  }

  async getShoppingCart () {
    let cart = await (this.shoppingCart.getCart());
    this.cartSubscription = cart.snapshotChanges().subscribe(values=>{
      this.shoppingCartInstance = new ShoppingCart();          
      if (values.payload.toJSON())
      this.shoppingCartInstance.getTotalItemCountJson(values.payload.toJSON()["items"]);      
    })
  }

  ngOnDestroy () {
    this.cartSubscription.unsubscribe();
  }

}
