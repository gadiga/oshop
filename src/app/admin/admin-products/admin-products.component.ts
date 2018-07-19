import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Observable } from '@firebase/util';
import { Product } from '../../models/product.model';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  productList$;
  productList: Product[];
  tableResource: DataTableResource<Product>;
  items: Product[] = []; // data table items
  itemCount: number;

  constructor(private productService: ProductService) {
    this.productList$ = this.productService.products;
    let prods=[];
    this.productList$.subscribe(prodList=> {
      prodList.forEach(products => {
        let indx = prods.length;
        prods[indx]={};
        prods[indx]['key'] = products.key;
        prods[indx]['title'] = products.payload.val().title;
        prods[indx]['price'] = products.payload.val().price;
        prods[indx]['imageUrl'] = products.payload.val().imageUrl;
        prods[indx]['category'] = products.payload.val().category;
      });
      this.items = this.productList = prods;

      // - data table
      this.initializeDataTable();
    });
   }

  ngOnInit() {
  }

  filter (query: string) {
    this.items = (query) ? 
    this.productList.filter(product=>product.title.toLowerCase().includes(query.toLowerCase())) :
    this.productList;

    this.initializeDataTable();
  }

  reloadItems(params) {

    if (!this.tableResource) return;
    this.tableResource.query(params)
    .then(items=>this.items = items);
  }

  private initializeDataTable(): void {
    this.tableResource = new DataTableResource(this.items);
    this.tableResource.query({offset:0})
    .then(_=>_);
    this.tableResource.count()
    .then(count=>this.itemCount = count)
  }

}
