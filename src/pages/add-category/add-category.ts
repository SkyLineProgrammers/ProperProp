import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { ViewProductPage } from '../view-product/view-product';
import { ViewCategoryPage } from '../view-category/view-category';
import { FurnitureDashboardPage } from '../furniture-dashboard/furniture-dashboard';
import * as firebase from 'firebase'
import { GeneralProvider } from '../../providers/general/general';
/**
 * Generated class for the AddCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-category',
  templateUrl: 'add-category.html',
})
export class AddCategoryPage {

  CategoryName = "";
  CategoryImage = "";
  IsActive: any;
  ImageEvent: any;
  public ImageLink = "";
  CatID = "";
  Logo: any;
  UpdateCtaegoryName = ""
  OneTime = 0

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, public ObjGeneral: GeneralProvider, public loadingCtrl: LoadingController) {
    var catId = this.navParams.get('categoryID');
    this.GetAllImages();
    if (catId != undefined) {
      this.CatID = catId;
      this.database.object('FurnitureDB/Category/' + catId).valueChanges().subscribe(data => {
        if (this.OneTime == 0) {
          let SubArr = Object.keys(data);
          this.CategoryName = data[SubArr[1]];
          this.UpdateCtaegoryName = data[SubArr[1]];
          this.ImageLink = data[SubArr[0]];
          this.IsActive = data[SubArr[2]];
          this.OneTime = 1;
        }
      })
    }
  }

  UpdateCategoryProduct() {
    //  
    var cat = this.UpdateCtaegoryName;
    var ref = firebase.database().ref().child('FurnitureDB/Product');
    ref.orderByChild('Category').startAt(cat).endAt(cat).on('child_added', (snapshot) => {
      //  
      let ChatID = snapshot.val();
      this.updateProduct(snapshot.key);
    })
  }

  updateProduct(ID) {
    //  
    this.database.list('FurnitureDB/Product/').update(ID, {
      Category: this.CategoryName,
      IsActive: this.IsActive
    })
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
    console.log('ionViewDidLoad AddCategoryPage');
  }

  AddCategory() {
    if (this.CatID == "") {
      if (this.CategoryName != "") {
        this.database.list("FurnitureDB/Category/").push({
          CategoryName: this.CategoryName,
          CategoryImage: this.ImageLink,
          isActive: this.IsActive
        });
        this.Reset();
        this.navCtrl.push(FurnitureDashboardPage);
      } else {
        alert("Fill field first");
      }
    }
    else {
      this.database.list("FurnitureDB/Category/").update(this.CatID, {
        CategoryName: this.CategoryName,
        CategoryImage: this.ImageLink,
        isActive: this.IsActive
      }).then(data => {
        this.UpdateCategoryProduct();
        // this.Reset();
        this.navCtrl.push(FurnitureDashboardPage);
      })
    }


  }

  Reset() { this.CategoryName = "" }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 8000
    });
    loader.present();
  }

  onFileChanged(param) {
    var aa;
    const file: File = param.target.files[0];
    const metaData = { 'contentType': file.type };
    const StorageRef: firebase.storage.Reference = firebase.storage().ref('/photos/Category/' + this.CategoryName);
    const Store = StorageRef.put(file, metaData);
    this.presentLoading();
    setTimeout(() => {
      const UP: firebase.storage.UploadTask = Store;
      UP.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
        aa = downloadURL;
      });
    }, 5000);

    setTimeout(() => {
      this.ImageLink = aa;
    }, 8000);

  }




}
