import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Product } from './models/product';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase){ }

  create(product){
   return this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products');
  }

  getProduct(productId):AngularFireObject<Product>{
    console.log(productId);
    return this.db.object('/products/'+ productId);
  }

  update(productId,product){
    return this.db.object('/products/'+ productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/'+ productId).remove();
  }

  uploadPhoto(file,metaData){
    const storageRef: firebase.storage.Reference= firebase.storage().ref('/photos/products/').child(file.name);
    var task= storageRef.put(file,metaData);
    debugger;
    task.on("state_changed",(snapshot) =>  {
      var percentage= (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     debugger;
      if(percentage==100){
      storageRef.getDownloadURL().then((url: string)=>{
        debugger;
        console.log(url);
        debugger;
        return url;
        });
      } 
      else{
        return 'abc';
      }
    }); 
  }

}
