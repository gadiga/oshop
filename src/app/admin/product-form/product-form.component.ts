import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<any[]>;
  saveStatus;

  constructor(categoryService: CategoryService, private productService: ProductService) {
    this.categories$ = categoryService.categories;
   }

  ngOnInit() {
  }
  
  save (product) {
    console.log(product);
    this.saveStatus = {status: 'error', message: 'Not saved!!'}
    this.productService.create(product)
    .then(_ => {
      console.log('successfully saved.....')
      this.saveStatus = {status: 'success', message: 'Saved successfully...'}
    });
  }
}
