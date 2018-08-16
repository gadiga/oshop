import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  private orders$;
  myOrders: any[];
  myId: any;

  constructor(private orderService: OrdersService, private auth: AuthService) {
    this.initUser();
   }

  async initUser () {
    let login = await this.auth.$loginUser;
    console.log('login', login)
    await login.subscribe(async user=>{
      this.myId = user.uid;
      this.orders$ = await this.orderService.getOrderFromUser(this.myId);
    });
  }

  ngOnInit() {
    this.orders$.subscribe(orders=>{
      console.log('orders', orders)
      this.myOrders = orders
      this.myOrders.forEach(order=>{
        let totPrice: number=0;
        order.items.forEach(item=>{
          totPrice += item.totalPrice;
        });
        order['totalPrice'] = totPrice;
      })
    });
  }

}
