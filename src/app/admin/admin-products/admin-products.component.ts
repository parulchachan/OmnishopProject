import { ProductService } from './../../product.service';
import { Component,  OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  subscription: Subscription;
  
  products=[];
  filteredProducts=[];
  id;
  constructor(private productService: ProductService) {
    this.subscription=this.productService.getAll().snapshotChanges().subscribe(
      list=>{
        let array=list.map(item=>{
          return{
            key: item.key,
            ...item.payload.val()
          };
        });
        this.filteredProducts=this.products=array;
      });
  }

  filter(query: string){
    this.filteredProducts=(query) ?
      this.products.filter(p=> p.title.toLowerCase().includes(query.toLowerCase( ))) : this.products;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


// this.subscription= this.productService.getAll().valueChanges()
// .subscribe(product=>{
//   this.filteredProducts=this.products=product ;
// });
// console.log(this.products);
//***************************************************************************************
// this.productService.getAll().snapshotChanges().forEach(productsSnapshot=>{
//   productsSnapshot.forEach(productSnapshot=>{
//     this.products= [];
//     let product = productSnapshot.payload.toJSON();
//     // product['title']= product.title;
//     // console.log(product.title);
//     // product['price']= product.price;
//     // product['category']= product.caterory;
//     // product['imageUrl']= product.imageUrl;
//     // product['material']= product.material;
//     // product['seller']= product.seller;
//     // product['description']= product.description;
//     product['$key']= productSnapshot.key;
//     console.log(product);
//     this.products.push(product as Product);
//   })
// })
// console.log(this.products );
// this.filteredProducts=this.products;
