import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FurnitureProductPage } from "../furniture-product/furniture-product";
import { FurnitureAddtocartPage } from '../furniture-addtocart/furniture-addtocart';
import { ViewWishlistPage } from '../view-wishlist/view-wishlist';
import { GeneralProvider } from "../../providers/general/general";
import { FurnitureViewBookorderPage } from '../furniture-view-bookorder/furniture-view-bookorder';
import { FurnitureLoginPage } from '../furniture-login/furniture-login';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class MainHomePage {


  home = FurnitureProductPage;
  Addtocart = FurnitureAddtocartPage;
  WishList = ViewWishlistPage;
  MyOrders = FurnitureViewBookorderPage;
  tabToShow = 0;
  // home :any;
  // Addtocart:any;
  // WishList:any;
  // MyOrders:any;



  constructor(public navCtrl: NavController, public navParams: NavParams, private ObjGeneral: GeneralProvider) {

    let test = this.navParams.get('pageType');
    if (test == 'cart') {
      this.tabToShow = 1;
    } else if (test == 'order') {
      this.tabToShow = 3;
    }else {
      this.tabToShow = 0;
    }
  }

  GotoOrderPage() {
    let sk = this.ObjGeneral.UserInfo[0];
    if (sk == undefined) {
      this.ObjGeneral.IsMovetoOrders = true;
      this.navCtrl.push(FurnitureLoginPage)
    }
    else {
      this.navCtrl.push(FurnitureViewBookorderPage)
    }
  }
  ionViewDidLoad() {
    // if (this.ObjGeneral.IsLoggedID) { }
    // else {
    //   this.ObjGeneral.IsMovetoOrders = true;
    // }

    console.log('ionViewDidLoad HomePage');
  }

}
