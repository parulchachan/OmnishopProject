import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$
  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    let cart$=(await this.shoppingCartService.getCart()).valueChanges()
    cart$.subscribe(x=>{
      this.cart$=new ShoppingCart(x.items);
    }) 
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }


}
