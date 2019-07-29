import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class  ShoppingCartService {

  constructor(private db: AngularFireDatabase) {}
  
  async getCart(): Promise<AngularFireObject<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+cartId)
      
  }

  async addToCart(product){
    let cartId=await this.getOrCreateCartId(); 
    let item$=this.getItem(cartId,product.key);
    item$.valueChanges().take(1).subscribe(item=>{
      if(item) item$.update({product:product, quantity :item['quantity']+1});
      else item$.update({product:product, quantity :1});
    })
  }

  async removeFromCart(product: Product){
    let cartId=await this.getOrCreateCartId(); 
    let item$=this.getItem(cartId,product.key);
    item$.valueChanges().take(1).subscribe(item=>{
      if(item['quantity']===1) item$.remove();
      else item$.update({product:product,quantity :item['quantity']-1});
    })
  }

  async clearCart(){
   let cartId= await this.getOrCreateCartId();
   this.db.object('/shopping-carts/'+ cartId + '/items').remove();

  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated:new Date().getTime()
    })
  } 

  private getItem(cartId,productId){
    return this.db.object('/shopping-carts/'+cartId+'/items/'+ productId);
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId=localStorage.getItem('cartId');
    if(cartId) return cartId;
      
    let result= await this.create();
    localStorage.setItem('cartId',result.key);
    return result.key; 
  }

  
}
