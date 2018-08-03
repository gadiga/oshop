import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  productList$: Observable<any>;
  productList: Product[]=[];
  items: Product[] = [];
  selectedCategory: string;
  shoppingCart;
  shoppingCartSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {
    this.activatedRoute.data.forEach(data=>this.productList$ = data.data.products);    
  }

  async ngOnInit() {
    (await this.productList$).subscribe((data)=>this.productList.push(data));
    this.activatedRoute.queryParamMap.subscribe((param: any)=>{
      this.selectedCategory = param.get('category') || null;
      this.filter(this.selectedCategory);
    });

    this.shoppingCartSub = (await this.shoppingCartService.getCart())
    .snapshotChanges().subscribe(result=>this.shoppingCart=result.payload.val().items);
  }

  ngOnDestroy () {
    this.shoppingCartSub.unsubscribe();
  }

  filter(query: any) {
    this.selectedCategory = query ? query : null;
    this.items = query ?
      this.productList.filter(product => product.category === query) :
      this.productList;
  }

}

