import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit,OnDestroy {
  product: Product;
  id;
  shoppingCart:ShoppingCart;
  Subscription;


  constructor(private route:ActivatedRoute,private productService: ProductService,
    private shoppingCartService:ShoppingCartService) {
    
    this.id=this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.getProduct(this.id).valueChanges().take(1).subscribe(p => {
      this.product = p;
      this.product.key=this.id;
    });
    
   }

   async ngOnInit() {
    this.Subscription=(await this.shoppingCartService.getCart()).valueChanges().subscribe(cart=>{
      this.shoppingCart=new ShoppingCart(cart.items);
    });

  }

  ngOnDestroy(){
    this.Subscription.unsubscribe();
  }
  addToCart(){
    this.shoppingCartService.addToCart(this.product);
  }

}
