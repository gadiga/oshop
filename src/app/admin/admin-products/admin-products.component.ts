import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Observable } from '@firebase/util';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  productList$;

  constructor(private productService: ProductService) {
    this.productList$ = this.productService.products;
   }

  ngOnInit() {
  }

}
