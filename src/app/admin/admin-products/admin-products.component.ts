import { ProductService } from './../../product.service';
import { Component,  OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  subscription: Subscription;
  products=[];
  filteredProducts=[];
  listData:MatTableDataSource<any>;
  query: string;
  displayedColumns: string[]=['title','price','action'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;



  constructor(private productService: ProductService) {
    this.subscription=this.productService.getAll().snapshotChanges().subscribe(
      list=>{
        this.products=list.map(item=>{
          return{
            key: item.key,
            ...item.payload.val()
          };
        });
        this.listData= new MatTableDataSource(this.products);
        this.listData.sort = this.sort;
        this.listData.paginator=this.paginator;
      });
  }

  onSearchClear(){
    this.query="";
    this.filter();
  }

  filter(){
    this.filteredProducts=(this.query) ?
      this.products.filter(p=> p.title.toLowerCase().includes(this.query.toLowerCase( ))) : this.products;
      this.listData= new MatTableDataSource(this.filteredProducts);
      this.listData.sort = this.sort;
      this.listData.paginator=this.paginator;
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
