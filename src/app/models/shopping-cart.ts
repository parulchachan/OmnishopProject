import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-items';

export class ShoppingCart{
    items:ShoppingCartItem[]=[];
    constructor(public itemsMap){      //type : {[productId: string]: ShoppingCartItem }
        
        for(let productId in itemsMap){
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem(item.product,item.quantity));
        }
    }

    getQuantity(product: Product){
        if(!this.itemsMap) return 0;
        let item=this.itemsMap[product.key];
        return item? item.quantity : 0;
      }

    get totalItemsCount(){
        let count = 0;
        for(let productId in this.itemsMap)
            count+=this.itemsMap[productId].quantity;
        return count;
   } 
    
   get totalPrice(){
       let sum =0;
    for(let productId in this.items)
        sum+=this.items[productId].totalPrice;
    return sum;
    }


    // get productIds(){
    //     return Object.keys(this.items);
    // }
}