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
import { BsNavbarComponent } from './core/components/bs-navbar/bs-navbar.component';
import { ContainerTestComponent, Pane } from './container-test/container-test.component';
import { ContentTestComponent } from './content-test/content-test.component';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping/shopping.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ProductsResolve } from 'shared/resolvers/product-resolve.service';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    ContainerTestComponent,
    ContentTestComponent,
    Pane
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
      {path:'login', component: LoginComponent}
    ]),
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    DataTableModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule
  ],
  providers: [
    {provide: FirebaseAppConfigToken, useValue: environment.firebase},
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
