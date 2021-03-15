import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FurnitureProductPage } from '../furniture-product/furniture-product';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FurnitureAddtocartPage } from "../furniture-addtocart/furniture-addtocart";
import { GeneralProvider } from "../../providers/general/general";
/**
 * Generated class for the FurnitureCatViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-furniture-cat-view',
  templateUrl: 'furniture-cat-view.html',
})
export class FurnitureCatViewPage {

  public AllcatArray = [];
  public AllAddtocartArray = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, public ObjGeneral: GeneralProvider) {
    this.ViewCategory();
    // this.GetAddtoCart();
  }

  // UseLes
  // GetAddtoCart() {
  //   this.database.object('FurnitureDB/AddtoCart/' + this.ObjGeneral.UserName).valueChanges().subscribe(data => {
  //     let SubArr = Object.keys(data);
  //     this.AllAddtocartArray = [];
  //     for (var loop = 1; loop < SubArr.length; loop++) {
  //       const object2 = Object.assign({ CatID: SubArr[loop] }, data[SubArr[loop]]);
  //       this.AllAddtocartArray.push(object2);
  //     }
  //     this.ObjGeneral.UserAddtoCart = this.AllAddtocartArray
  //     
  //   })
  // }

  ViewCategory() {
    this.database.object('FurnitureDB/Category').valueChanges().subscribe(data => {
      let SubArr = Object.keys(data);
      this.AllcatArray = [];
      for (var loop = 0; loop < SubArr.length; loop++) {
        const object2 = Object.assign({ CatID: SubArr[loop] }, data[SubArr[loop]]);
        this.AllcatArray.push(object2);
      }
    })
  }

  navigateToProduct(param, image) {
    this.navCtrl.push(FurnitureProductPage, { categoryID: param , categoryImage : image });
  }

  gotoAddtoCart() {
    this.navCtrl.push(FurnitureAddtocartPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FurnitureCatViewPage');
  }

}
