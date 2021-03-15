import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { FurnitureDashboardPage } from "../furniture-dashboard/furniture-dashboard";

/**
 * Generated class for the FurnitureBookOrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-furniture-book-order-detail',
  templateUrl: 'furniture-book-order-detail.html',
})
export class FurnitureBookOrderDetailPage {

  AllProducts = [];
  AddToCartInfo = [];
  status = "";
  OrderID = "";
  BtnText = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private database: AngularFireDatabase, public toastCtrl: ToastController) {
    this.AddToCartInfo = this.navParams.get('ProductInfo');
    
    this.status = this.navParams.get('Status');
    this.OrderID = this.navParams.get('OrderID');
    this.getAllProducts();

    if (this.status == "Cencel") {
      this.BtnText = "Re Order"
    }
    else if (this.status == "Booked") {
      this.BtnText = "Confirm Order"
    }
    else if (this.status == "Confirm") {
      this.BtnText = "Deliver"
    }
    else if (this.status == "Complete") {
      this.BtnText = "Completed"
    }
    else if (this.status == "Deliver") {
      this.BtnText = "Return"
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FurnitureBookOrderDetailPage');
  }

  getAllProducts() {
    this.database.object('FurnitureDB/Product').valueChanges().subscribe(data => {
      let SubArr = Object.keys(data);
      for (var loop = 0; loop < SubArr.length; loop++) {
        const object2 = Object.assign({ ID: SubArr[loop] }, data[SubArr[loop]]);
        this.AllProducts.push(object2);
      }
    })
  }

  ConfirmOrder() {


    if (this.status == "Cencel") {
      this.database.list('FurnitureDB/Orders/').update(this.OrderID, {
        isBooked: "0",
        IsCencle: "0",
        IsDeliver: "0",
        Return: "0"
      })
      this.dismiss();
    }
    else if (this.status == "Booked") {
      this.database.list('FurnitureDB/Orders/').update(this.OrderID, {
        isBooked: "1",
        IsCencle: "0",
        IsDeliver: "0",
        Return: "0"
      })
      this.dismiss();
    }
    else if (this.status == "Confirm") {
      this.database.list('FurnitureDB/Orders/').update(this.OrderID, {
        isBooked: "1",
        IsCencle: "0",
        IsDeliver: "1",
        Return: "0",
        DeliverDate : new Date().toISOString().split('T')[0]        
      })

      for (var loop = 0; loop < this.AddToCartInfo.length; loop++) {
        for (var innerLoop = 0; innerLoop < this.AllProducts.length; innerLoop++) {
          if (this.AllProducts[innerLoop].ID == this.AddToCartInfo[loop].ID) {
            var CureentQuanitity = parseFloat(this.AllProducts[innerLoop].Quantity) - parseFloat(this.AddToCartInfo[loop].BucketQuantity);
            var test = CureentQuanitity;
            var test2 = this.AddToCartInfo[loop];
            var test3 = this.AllProducts[innerLoop];

            this.database.list('FurnitureDB/Product/').update(this.AddToCartInfo[loop].ID, {
              Quantity: CureentQuanitity,
            })
          }

        }
      }


      this.dismiss();
    }
    else if (this.status == "Complete") {
      const toast = this.toastCtrl.create({
        message: 'Your Order Has Been Completed',
        duration: 3000
      });
      toast.present();

    }
    else if (this.status == "Deliver") {
      this.database.list('FurnitureDB/Orders/').update(this.OrderID, {
        isBooked: "1",
        IsCencle: "0",
        IsDeliver: "1",
        Return: "1",
        ReturnDate : new Date().toISOString().split('T')[0]

      })

      for (var loop = 0; loop < this.AddToCartInfo.length; loop++) {
        for (var innerLoop = 0; innerLoop < this.AllProducts.length; innerLoop++) {
          if (this.AllProducts[innerLoop].ID == this.AddToCartInfo[loop].ID) {
            var CureentQuanitity = parseFloat(this.AllProducts[innerLoop].Quantity) + parseFloat(this.AddToCartInfo[loop].BucketQuantity);
            var test = CureentQuanitity;
            var test2 = this.AddToCartInfo[loop];
            var test3 = this.AllProducts[innerLoop];

            this.database.list('FurnitureDB/Product/').update(this.AddToCartInfo[loop].ID, {
              Quantity: CureentQuanitity,
            })
          }

        }
      }


      this.dismiss();
    }




    // if (this.status == "0") {
    //   this.database.list('FurnitureDB/Orders/').update(this.OrderID, {
    //     isBooked: "1"
    //   })
    //   this.dismiss();
    // }
    // else {
    //   alert("Already Bo0ked");
    // }
  }

  dismiss() {
    this.viewCtrl.dismiss();
    // this.navCtrl.setRoot(FurnitureDashboardPage);
  }

}
