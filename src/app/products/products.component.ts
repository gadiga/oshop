import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { CategoryService } from '../category.service';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList$;
  productList: Product[];
  items: Product[]=[];
  categories$: Observable<any[]>;
  categoryList: {}[] = [];
  selectedCategory;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParamMap.subscribe(param=>this.selectedCategory = param.get('category') || null);
    this.categories$ = this.categoryService.categories;
    let cats=[];
    this.categories$.subscribe(catList=>{
      this.categoryList = cats;
      catList.forEach(proCats => {
        let indx = cats.length;
        cats[indx]={};
        cats[indx]['key'] = proCats.key;
        cats[indx]['name'] = proCats.payload.val().name;
      });
    });

    this.productList$ = this.productService.products;
    let prods=[];   

    // this.productList$.subscribe(prodList=> {
    //   this.productList = prods;
    //   let selectCat = this.selectedCategory;
    //   prodList.forEach(products => {
    //     let indx = prods.length;
    //     prods[indx]={};
    //     prods[indx]['key'] = products.key;
    //     prods[indx]['title'] = products.payload.val().title;
    //     prods[indx]['price'] = products.payload.val().price;
    //     prods[indx]['imageUrl'] = products.payload.val().imageUrl;
    //     prods[indx]['category'] = products.payload.val().category;
    //     if (selectCat === prods[indx].category) this.items.push(prods[indx]);
    //   });
    // });

    this.productList$.subscribe(prodList=> {
      this.productList = prods;
      let selectCat = this.selectedCategory;
      prodList.forEach(products => {
        let indx = prods.length;
        prods[indx]={};
        prods[indx]['key'] = products.key;
        prods[indx]['title'] = products.payload.val().title;
        prods[indx]['price'] = products.payload.val().price;
        prods[indx]['imageUrl'] = products.payload.val().imageUrl;
        prods[indx]['category'] = products.payload.val().category;
        if (selectCat === prods[indx].category) this.items.push(prods[indx]);
      });
    });
  }

  ngOnInit() {
    
  }
  
  filter(query: any) {
    this.selectedCategory = query ? query.key : null;
    this.items = query ?
     this.productList.filter(product=>product.category === query.key):
     this.productList;
  }

}

