import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {  

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;
  
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {    
  }

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product, 1);
  }

  subFromCart(product: Product) {
    console.log('sub from cart...')
    this.shoppingCartService.addToCart(product, -1);
  }

  getQuantity() {
    if (this.shoppingCart === undefined) return;
    let prod = this.shoppingCart[this.product.key];
    return prod ? prod.quantity : '';
  }

}
