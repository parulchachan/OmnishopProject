import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  constructor(private db: AngularFireDatabase) {

   }

   photoSelected(event : any){
     const file: File=event.target.files[0];

     const metaData={'contentType': file.type};
     const storageRef: firebase.storage.Reference= firebase.storage().ref('/photos/products/').child(file.name);
     var task=storageRef.put(file,metaData);
     //console.log("Uploading: ",file.name);
    
     task.on("state_changed",(snapshot) =>  {
      var percentage= (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     
      if(percentage==100){
      storageRef.getDownloadURL().then(function (url){
        return url
        });
      } 
    });    
  }
  ngOnInit() {
  }

}
