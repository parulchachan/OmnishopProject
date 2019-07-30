import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit,OnDestroy {
  orderSubscription: Subscription;
  userSubscription: Subscription;
  userId;
  orders: Order[];
  order$;

  constructor(private orderService: OrderService,private authService: AuthService,
    private spinner: NgxSpinnerService) {
      spinner.show();
     }

  async ngOnInit() {
    this.userSubscription=await this.authService.user$.subscribe(user=>this.userId=user.uid);
    // this.order$ =(await this.orderService.getOrderByUser(this.userId)).valueChanges();
    // And use it with async pipe n get the value but not key.

    let temp$=(await this.orderService.getOrderByUser(this.userId)).snapshotChanges();
    this.orderSubscription= temp$.subscribe(x=>{
      this.orders=x.map(item=>{
        return{ key: item.key,
        ...item.payload.val()};
        });
        this.spinner.hide();
      });
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  getDate(data){
    return data.getTime();
  }

}
