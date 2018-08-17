import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular5-data-table';
import { AngularFireModule, FirebaseAppConfigToken } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ng2-validation';

import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ContainerTestComponent, Pane } from './container-test/container-test.component';
import { ContentTestSiblingComponent } from './content-test-sibling/content-test-sibling.component';
import { ContentTestComponent } from './content-test/content-test.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductsComponent } from './products/products.component';
import { OrderResolverService } from './shared/resolvers/order-resolver.service';
import { ProductsResolve } from './shared/resolvers/product-resolve.service';
import { AuthGuard } from './shared/services/auth-guard.service';
import { SharedModule } from './shared/shared.module';
import { ShoppingCartFormComponent } from './shopping-cart-form/shopping-cart-form.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    LoginComponent,
    ProductFilterComponent,
    ContainerTestComponent,
    ContentTestComponent,
    Pane,
    ContentTestSiblingComponent,
    ShoppingCartSummaryComponent,
    ShoppingCartFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'oshop'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      {
        path:'', 
        component: ProductsComponent,
        resolve: {
          data: ProductsResolve
        }
      },        
      {
        path:'products', 
        component: ProductsComponent,
        data: {message: 'thisismsg'}
      },
      {path:'shopping-cart', component: ShoppingCartComponent},
      {path:'login', component: LoginComponent},
      {path:'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {
        path:'order-success', 
        component: OrderSuccessComponent, 
        canActivate: [AuthGuard],
        resolve: {
          data: OrderResolverService
        }
      },
      {path:'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]}
    ]),
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    DataTableModule,
    SharedModule,
    AdminModule
  ],
  providers: [
    {provide: FirebaseAppConfigToken, useValue: environment.firebase},
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
