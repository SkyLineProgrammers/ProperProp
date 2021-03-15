import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { FurnitureProductPage } from '../furniture-product/furniture-product';
import { ViewProductPage } from '../view-product/view-product';
import { FurnitureDashboardPage } from '../furniture-dashboard/furniture-dashboard';
import * as firebase from 'firebase'
import { GeneralProvider } from "../../providers/general/general";

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  Logo: any;

  ProductName = "";
  Category = "";
  carbrand = "";
  Description = "";
  Quantity = "";
  Price = 0;
  IsActive = false;
  CategoryName = [];
  ImageLink = "";
  ImageLink1 = "";
  ImageLink2 = "";
  ImageLink3 = "";
  ProductID = "";
  IsModificationAllowed = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, public loadingCtrl: LoadingController, public ObjGeneral: GeneralProvider) {


    var Product = this.navParams.get('product');
    if (Product != undefined) {
      this.ProductName = Product.ProductName;
      this.Description = Product.Description;
      this.ProductID = Product.ID;
      this.ImageLink = Product.Image1;
      this.ImageLink1 = Product.Image2;
      this.ImageLink2 = Product.Image3;
      this.ImageLink3 = Product.Image4;
      this.IsActive = Product.IsActive;
      this.Price = Product.Price;

      this.Quantity = Product.Quantity;
      this.Category = Product.Category
      this.carbrand = Product.Category;
    }

    this.FillCategory();
    this.GetAllImages();

  }

  GetAllImages() {
    this.database.object('FurnitureDB/CustomImages').valueChanges().subscribe(data => {
      if (data != null) {
        let SubArr = Object.keys(data);
        let object2: any;
        for (var loop = 0; loop < SubArr.length; loop++) {
          object2 = Object.assign({ ID: SubArr[loop] }, data[SubArr[loop]]);
        }
        this.Logo = object2.Logo

      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  FillCategory() {
    this.database.object('FurnitureDB/Category').valueChanges().subscribe(data => {
      let SubArr = Object.keys(data);
      this.CategoryName = [];
      for (var loop = 0; loop < SubArr.length; loop++) {
        const object2 = Object.assign({ ID: SubArr[loop] }, data[SubArr[loop]]);
        this.CategoryName.push(object2);
      }
      if (this.ProductID != "") {
        for (var loop = 0; loop < this.CategoryName.length; loop++) {

          if (this.Category == this.CategoryName[loop].ID) {
            this.carbrand = this.CategoryName[loop].CategoryName;
          }
        }
        if (this.carbrand == "") {
          this.carbrand = this.CategoryName[0].CategoryName;
        }
      }
      else {
        if (this.carbrand == "") {
          this.carbrand = this.CategoryName[0].CategoryName;
        }
      }
    })
  }

  onChange(selectedValue) {
    this.Category = selectedValue.ID;
  }

  Reset() {
    this.ProductName = "";
    this.Quantity = "";
    this.Category = "";
    this.Description = "";
    this.IsActive = false;
    this.CategoryName = [];
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 8000
    });
    loader.present();
  }

  // AddProduct() {
  //    
  //   console.log(this.ImageLink + " + " + this.ImageLink1 + " + " + this.ImageLink2 + " + " + this.ImageLink3);
  //   if (this.ProductID == "") {
  //     if (this.ProductName != "" && this.Category != "" && this.Quantity !== "") {
  //       this.database.list("FurnitureDB/Product/").push({
  //         ProductName: this.ProductName,
  //         Quantity: this.Quantity,
  //         Price: this.Price,
  //         Category: this.carbrand,
  //         Description: this.Description,
  //         IsActive: this.IsActive,
  //         Image1: this.ImageLink,
  //         Image2: this.ImageLink1,
  //         Image3: this.ImageLink2,
  //         Image4: this.ImageLink3,
  //         IsModificationAllowed: this.IsModificationAllowed
  //       }).then(x => {
  //         this.ImageLink = "";
  //         this.ImageLink1 = "";
  //         this.ImageLink2 = "";
  //         this.ImageLink3 = "";
  //         console.clear();
  //       })
  //       // this.Reset();
  //       // this.navCtrl.push(FurnitureDashboardPage);
  //     } else {
  //       alert("Fill field first");
  //     }
  //   }
  //   else {
  //     this.database.list("FurnitureDB/Product/").update(this.ProductID, {
  //       ProductName: this.ProductName,
  //       Quantity: this.Quantity,
  //       Price: this.Price,
  //       Category: this.carbrand,
  //       Description: this.Description,
  //       IsActive: this.IsActive,
  //       Image1: this.ImageLink,
  //       Image2: this.ImageLink1,
  //       Image3: this.ImageLink2,
  //       Image4: this.ImageLink3,
  //       IsModificationAllowed: this.IsModificationAllowed
  //     })
  //     // this.Reset();
  //     // this.navCtrl.push(ViewProductPage);
  //     // this.navCtrl.push(FurnitureDashboardPage);
  //   }
  // }

  AddProduct() {

    console.log(this.ImageLink + " + " + this.ImageLink1 + " + " + this.ImageLink2 + " + " + this.ImageLink3);
    if (this.ProductID == "") {
      if (this.ProductName != "" && this.Category != "" && this.Quantity !== "") {
        this.database.list("FurnitureDB/Product/").push({
          ProductName: this.ProductName,
          Quantity: this.Quantity,
          Price: this.Price,
          Category: this.carbrand,
          Description: this.Description,
          IsActive: this.IsActive,
          Image1: this.ImageLink,
          Image2: this.ImageLink1,
          Image3: this.ImageLink2,
          Image4: this.ImageLink3,
          IsModificationAllowed: this.IsModificationAllowed
        }).then(x => {
          this.ImageLink = "";
          this.ImageLink1 = "";
          this.ImageLink2 = "";
          this.ImageLink3 = "";
          console.clear();
          this.Reset();
          this.navCtrl.pop();
        })

      } else {
        alert("Fill field first");
      }
    }
    else {
      this.database.list("FurnitureDB/Product/").update(this.ProductID, {
        ProductName: this.ProductName,
        Quantity: this.Quantity,
        Price: this.Price,
        Category: this.carbrand,
        Description: this.Description,
        IsActive: this.IsActive,
        Image1: this.ImageLink,
        Image2: this.ImageLink1,
        Image3: this.ImageLink2,
        Image4: this.ImageLink3,
        IsModificationAllowed: this.IsModificationAllowed
      }).then(data => {
        this.Reset();
        this.navCtrl.pop();
      });

    }
  }

  onFileChanged(param) {
    var aa;
    const file: File = param.target.files[0];
    const metaData = { 'contentType': file.type };
    const StorageRef: firebase.storage.Reference = firebase.storage().ref('/photos/NewProduct/' + this.ProductName + "1");
    const Store = StorageRef.put(file, metaData);

    setTimeout(() => {
      const UP: firebase.storage.UploadTask = Store;
      UP.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        aa = downloadURL;
        this.ImageLink = aa;

      });
    }, 5000);
    this.presentLoading();
    // setTimeout(() => {
    //   this.ImageLink = aa;
    // }, 8000);

  }

  onFileChanged1(param) {
    var aa;
    const file: File = param.target.files[0];
    const metaData = { 'contentType': file.type };
    const StorageRef: firebase.storage.Reference = firebase.storage().ref('/photos/NewProduct/' + this.ProductName + "2");
    const Store = StorageRef.put(file, metaData);

    setTimeout(() => {
      const UP: firebase.storage.UploadTask = Store;
      UP.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        aa = downloadURL;
        this.ImageLink1 = aa;

      });
    }, 5000);
    this.presentLoading();
    // setTimeout(() => {
    //   this.ImageLink1 = aa;
    // }, 8000);

  }

  onFileChanged2(param) {
    var aa;
    const file: File = param.target.files[0];
    const metaData = { 'contentType': file.type };
    const StorageRef: firebase.storage.Reference = firebase.storage().ref('/photos/NewProduct/' + this.ProductName + "3");
    const Store = StorageRef.put(file, metaData);

    setTimeout(() => {
      const UP: firebase.storage.UploadTask = Store;
      UP.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        aa = downloadURL;
        this.ImageLink2 = aa;

      });
    }, 5000);
    this.presentLoading();
    // setTimeout(() => {
    //   this.ImageLink2 = aa;
    // }, 8000);

  }

  onFileChanged3(param) {
    var aa;
    const file: File = param.target.files[0];
    const metaData = { 'contentType': file.type };
    const StorageRef: firebase.storage.Reference = firebase.storage().ref('/photos/NewProduct/' + this.ProductName + "4");
    const Store = StorageRef.put(file, metaData);

    setTimeout(() => {
      const UP: firebase.storage.UploadTask = Store;
      UP.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        aa = downloadURL;
        this.ImageLink3 = aa;

      });
    }, 5000);
    this.presentLoading();
    // setTimeout(() => {
    //   this.ImageLink3 = aa;
    // }, 8000);

  }

}
