import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { GeneralProvider } from "../../providers/general/general";
import { FurnitureBookorderPage } from "../furniture-bookorder/furniture-bookorder";
import { FurnitureLoginPage } from '../furniture-login/furniture-login';

/**
 * Generated class for the FurnitureAddtocartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-furniture-addtocart',
  templateUrl: 'furniture-addtocart.html',
})
export class FurnitureAddtocartPage {

  public Productarray = [];
  public AddtoCart = [];
  public PrintAddtoCart = [];
  TotalAmount = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, public ObjGeneral: GeneralProvider, private toastCtrl: ToastController) {
    this.GetAllProduct();
    this.GetAllAddtoCart();
    setTimeout(() => {
      this.ShowAddtoCart();
    }, 1000);
  }

  ionViewWillEnter() {
    this.GetAllProduct();
    this.GetAllAddtoCart();
    setTimeout(() => {
      this.ShowAddtoCart();
    }, 1000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FurnitureAddtocartPage');
  }

  GetAllProduct() {
    this.database.object('FurnitureDB/Product').valueChanges().subscribe(data => {
      let SubArr = Object.keys(data);
      this.Productarray = [];
      for (var loop = 0; loop < SubArr.length; loop++) {
        const object2 = Object.assign({ ID: SubArr[loop] }, data[SubArr[loop]]);
        this.Productarray.push(object2);
      }
    })
  }

  GetAllAddtoCart() {
    this.database.object('FurnitureDB/AddtoCart/' + this.ObjGeneral.DeviceID).valueChanges().subscribe(data => {
      if (data != null) {
        let SubArr = Object.keys(data);
        this.AddtoCart = [];
        for (var loop = 0; loop < SubArr.length; loop++) {
          const object2 = Object.assign({ ID: SubArr[loop] }, data[SubArr[loop]]);
          this.AddtoCart.push(object2);
        }

      }
    })
  }

  PlusFunction(param) {

    let CheckQuantity = this.Productarray.find(items => items.ID == param.ID).Quantity;
    var Quantity = param.BucketQuantity;

    if (CheckQuantity != undefined && Quantity < CheckQuantity) {
      Quantity++;
      this.database.list("FurnitureDB/AddtoCart/" + this.ObjGeneral.DeviceID + "/").update(param.AddtoCartID, {
        Product_Quantity: Quantity
      })
      setTimeout(() => {
        this.ShowAddtoCart();
      }, 100);
    }
    else {
      const toast = this.toastCtrl.create({
        message: 'Out of Stock',
        duration: 3000
      });
      toast.present();
    }
  }

  MinusFunction(param) {
    var Quantity = param.BucketQuantity;
    Quantity--;
    if (Quantity == 0) {
      this.database.list("FurnitureDB/AddtoCart/" + this.ObjGeneral.DeviceID + "/").remove(param.AddtoCartID)
    }
    else {
      this.database.list("FurnitureDB/AddtoCart/" + this.ObjGeneral.DeviceID + "/").update(param.AddtoCartID, {
        Product_Quantity: Quantity
      })
    }
    setTimeout(() => {
      this.ShowAddtoCart();
    }, 100);
  }

  BookOrder() {

    if (this.PrintAddtoCart.length > 0) {

      var sk = this.ObjGeneral.UserInfo;

      if (sk.length != 0) {

        this.navCtrl.push(FurnitureBookorderPage, { data: this.PrintAddtoCart, NetAmount: this.TotalAmount });

      }

      else {
        this.ObjGeneral.IsMovetoCart = true;
        this.navCtrl.push(FurnitureLoginPage);

      }

    }

    else {

      const toast = this.toastCtrl.create({

        message: 'Your Bucket is Empty',

        duration: 3000

      });

      toast.present();

    }

  }

  ShowAddtoCart() {
    this.PrintAddtoCart = [];
    this.TotalAmount = 0;

    for (var loop = 0; loop < this.AddtoCart.length; loop++) {
      for (var Innerloop = 0; Innerloop < this.Productarray.length; Innerloop++) {
        if (this.AddtoCart[loop].ProductID == this.Productarray[Innerloop].ID) {
          console.log("Price " + this.Productarray[Innerloop].Price);
          console.log("Quantity " + this.AddtoCart[loop].Product_Quantity);
          var ProductID = this.Productarray[Innerloop].ID;
          var index = this.PrintAddtoCart.findIndex(x => x.ID == ProductID);
          if (index == -1) {
            var isModifications = '0'
            if (this.AddtoCart[loop].ProductModificaiton != '') {
              isModifications = this.AddtoCart[loop].ProductModificaiton
            }
            const object2 = Object.assign({ BucketQuantity: this.AddtoCart[loop].Product_Quantity }, { AddtoCartID: this.AddtoCart[loop].ID }, this.Productarray[Innerloop], { Modification: isModifications }, { Modification: this.AddtoCart[loop].ProductModificaiton });
            this.PrintAddtoCart.push(object2);
            console.log(this.PrintAddtoCart);
            var test = this.Productarray[Innerloop].Price * this.AddtoCart[loop].Product_Quantity;
            this.TotalAmount = this.TotalAmount + test;
          }
          else {
            this.PrintAddtoCart[index].BucketQuantity = this.PrintAddtoCart[index].BucketQuantity + this.AddtoCart[loop].Product_Quantity;
            var test = this.PrintAddtoCart[index].Price * this.AddtoCart[loop].Product_Quantity;
            this.TotalAmount = this.TotalAmount + test;
            // this.database.list("FurnitureDB/AddtoCart/" + this.ObjGeneral.UserName + "/").update(this.PrintAddtoCart[index].AddtoCartID, {
            //   Product_Quantity: this.PrintAddtoCart[index].BucketQuantity
            // })
            // this.database.list("FurnitureDB/AddtoCart/" + this.ObjGeneral.UserName + "/").remove(this.AddtoCart[loop].ID)
            this.database.list("FurnitureDB/AddtoCart/" + this.ObjGeneral.DeviceID + "/").update(this.PrintAddtoCart[index].AddtoCartID, {
              Product_Quantity: this.PrintAddtoCart[index].BucketQuantity
            })
            this.database.list("FurnitureDB/AddtoCart/" + this.ObjGeneral.DeviceID + "/").remove(this.AddtoCart[loop].ID)
          }

        }
      }
    }
  }

}
