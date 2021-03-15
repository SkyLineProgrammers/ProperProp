import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FurnitureCatViewPage } from "../furniture-cat-view/furniture-cat-view";
import { FurnitureAddtocartPage } from "../furniture-addtocart/furniture-addtocart";
import { GeneralProvider } from "../../providers/general/general";
import { FurnitureBookOrderDetailPage } from '../furniture-book-order-detail/furniture-book-order-detail';
import { FurnitureProductPage } from '../furniture-product/furniture-product';
import { MainHomePage } from "../home/home";
/**
 * Generated class for the FurnitureBookorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-furniture-bookorder',
  templateUrl: 'furniture-bookorder.html',
})
export class FurnitureBookorderPage {

  Name = "";
  Number = "";
  City = "";
  PostalCode = "";
  Adress = "";
  NetAmount = 0;
  OrderDetails;
  UserKey = "";
  Logo = [];
  ShowNetAmount = 0;
  CalculateNetAmount = 0;
  FromDate = new Date().toISOString().split('T')[0];
  ToDate = new Date().toISOString().split('T')[0];

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, public ObjGeneral: GeneralProvider) {
    this.OrderDetails = navParams.get('data');
    this.NetAmount = navParams.get('NetAmount');
    this.ShowNetAmount = navParams.get('NetAmount');
    var test = this.ObjGeneral.UserInfo;
    this.Name = (test[0].LogInID).toUpperCase();
    this.Number = test[0].Number;
    this.GetAllImages();
    this.UserKey = test[0].Key;
  }

  CalNetAmount(ev: any) {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(this.FromDate);
    var secondDate = new Date(this.ToDate);
    debugger;
    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    diffDays++;
    if (diffDays == 0) {
      diffDays = 1;
    }
    this.ShowNetAmount = this.NetAmount * diffDays;

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
    console.log('ionViewDidLoad FurnitureBookorderPage');
  }



  // AddOrder() {

  //   if (this.Name != "" && this.Number != "" && this.City != "" && this.PostalCode != "" && this.Adress != "") {
  //     let OrderID = new Date().getTime().toString();
  //     OrderID = OrderID.substring(OrderID.length - 8);
  //     this.database.list("FurnitureDB/Orders/").push({
  //       OrderID: OrderID,
  //       Name: this.Name,
  //       Number: this.Number,
  //       NetAmount: this.NetAmount,
  //       City: this.City,
  //       PostalCode: this.PostalCode,
  //       Adress: this.Adress,
  //       OrderDetails: this.OrderDetails,
  //       isBooked: 0
  //     })
  //     // this.navCtrl.push(FurnitureCatViewPage);
  //     this.navCtrl.push(FurnitureBookOrderDetailPage)
  //   }
  //   else {
  //     alert("Fiil All Feilds First");
  //   }

  // }

  GetAllAddtoCart() {
    this.database.object('FurnitureDB/AddtoCart/' + this.ObjGeneral.DeviceID).valueChanges().subscribe(data => {
      let SubArr = Object.keys(data);
      let Count = 0;
      let ProductID = "";
      for (var loop = 0; loop < SubArr.length; loop++) {

        const object2 = Object.assign({ ID: SubArr[loop] }, data[SubArr[loop]]);
        Count = 0;
        ProductID = "";
        this.database.list("FurnitureDB/AddtoCart/" + this.ObjGeneral.DeviceID + "/").remove(object2.AddtoCartID)
        if (object2.ProductID != "") {
          this.database.object("FurnitureDB/Product/" + object2.ProductID).valueChanges().subscribe(data => {

            if (Count == 0 && ProductID != object2.ProductID) {
              var A = data["Quantity"];
              let ProductQuantity = 0;
              if (A != undefined)
                ProductQuantity = Number(A) - Number(object2.Product_Quantity);
              Count++;
              ProductID = object2.ProductID;
              // this.database.list("FurnitureDB/Product").update(object2.ProductID, {
              //   Quantity: ProductQuantity
              // });
            }

          })
        }
        // .update(object2.ProductID, {
        //   Product_Quantity: 123 - 3
        // })
        //this.database.list("FurnitureDB/Product/" + data[SubArr[loop]].ProductID + "/").remove(object2.AddtoCartID)
      }
    })
  }

  AddOrder() {

    if (this.Name != "" && this.Number != "" && this.City != "" && this.PostalCode != "" && this.Adress != "") {

      let OrderID = new Date().getTime().toString();
      OrderID = OrderID.substring(OrderID.length - 8);

      var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      var firstDate = new Date(this.FromDate);
      var secondDate = new Date(this.ToDate);

      var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));


      this.database.list("FurnitureDB/Orders/").push({
        OrderID: OrderID,
        Name: this.Name,
        Number: this.Number,
        NetAmount: this.NetAmount,
        City: this.City,
        PostalCode: this.PostalCode,
        Adress: this.Adress,
        OrderDetails: this.OrderDetails,
        isBooked: 0,
        IsDeliver: 0,
        Return: 0,
        IsCencle: 0,
        UserKey: this.UserKey,
        OrderDate: new Date().toISOString().split('T')[0],
        ReturnDate: "",
        DeliverDate: "",
        FromDate: this.FromDate,
        ToDate: this.ToDate,
        NoOfDays: diffDays

      }).then(() => {
        this.GetAllAddtoCart();
      })
      // this.navCtrl.push(FurnitureCatViewPage);
      this.navCtrl.push(MainHomePage)

    }
    else {
      alert("Fiil All Feilds First");
    }

  }

  GotoAddtoCart() {
    this.navCtrl.push(FurnitureAddtocartPage);
  }

}
