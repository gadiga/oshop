import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs/Observable';
import { filter, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList$: Observable<any[]>;
  productList: Product[];
  items: Product[] = [];
  selectedCategory: string;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {
    // this.activatedRoute.queryParamMap.subscribe(param => this.selectedCategory = param.get('category') || null);


    this.productList$ = this.productService.products;
    let prods = [];

    let subsc: Subscription = this.productList$.pipe(switchMap(prodList => {
      this.productList = prods;
      let selectCat = this.selectedCategory;
      prodList.forEach(products => {
        let indx = prods.length;
        prods[indx] = {};
        prods[indx]['key'] = products.key;
        prods[indx]['title'] = products.payload.val().title;
        prods[indx]['price'] = products.payload.val().price;
        prods[indx]['imageUrl'] = products.payload.val().imageUrl;
        prods[indx]['category'] = products.payload.val().category;
      });
      return this.activatedRoute.queryParamMap;
    })
    ).subscribe(param => {
      this.selectedCategory = param.get('category') || null;
      this.filter(this.selectedCategory);
      // subsc.unsubscribe();
    });
  }

  ngOnInit() {

  }

  filter(query: any) {
    this.selectedCategory = query ? query : null;
    this.items = query ?
      this.productList.filter(product => product.category === query) :
      this.productList;
  }

}

