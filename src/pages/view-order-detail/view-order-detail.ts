import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ViewOrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-view-order-detail',
  templateUrl: 'view-order-detail.html',
})
export class ViewOrderDetailPage {
  ShowOrderArray = [];
  AddToCartInfo = [];
  TotalAmount =  0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    
    this.AddToCartInfo = this.navParams.get('ProductInfo');
    let OrderData = this.navParams.get("OrderDate");
    if (OrderData != undefined && OrderData.length > 0) {
      this.ShowOrderArray = OrderData;
      this.TotalAmount = parseFloat(this.ShowOrderArray[0].NetAmount) * parseFloat(this.ShowOrderArray[0].NoOfDays)

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewOrderDetailPage');
  }

  // GetOrderDe

  dismiss() {
    this.viewCtrl.dismiss();
    // this.navCtrl.setRoot(FurnitureDashboardPage);
  }


}
