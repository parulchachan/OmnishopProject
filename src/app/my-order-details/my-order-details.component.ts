import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-order-details',
  templateUrl: './my-order-details.component.html',
  styleUrls: ['./my-order-details.component.css']
})
export class MyOrderDetailsComponent implements OnInit {
  id;
  order:Order;
  constructor(private route:ActivatedRoute, private orderservice: OrderService ) {
    this.id=this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

}
