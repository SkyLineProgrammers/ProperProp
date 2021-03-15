import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { GeneralProvider } from "../../providers/general/general";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FurnitureBookOrderDetailPage } from "../furniture-book-order-detail/furniture-book-order-detail";
import { ViewOrderDetailPage } from '../view-order-detail/view-order-detail';
import { FurnitureInvoicePage } from "../furniture-invoice/furniture-invoice";
import { FurnitureLoginPage } from '../furniture-login/furniture-login';

/**
 * Generated class for the FurnitureViewBookorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-furniture-view-bookorder',
  templateUrl: 'furniture-view-bookorder.html',
})
export class FurnitureViewBookorderPage {

  OrderArray = [];
  ShwoOrderArray = [];
  ShowOrderArrayClone = [];
  filter = '';
  myInput;
  IsSearch = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, public ObjGeneral: GeneralProvider, public modalCtrl: ModalController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
    //Commented by Muzammil 8/2/19 and because already working on ionViewWillEnter method
    // let sk = this.ObjGeneral.UserInfo[0];
    // if (sk == undefined) {
    //   this.ObjGeneral.IsMovetoOrders = true;
    //   this.navCtrl.push(FurnitureLoginPage)
    // }
    // else {
    //   this.GeAllOrders();
    // }
  }

  ionViewWillEnter() {
    // Commented because moved to home.ts {}
    // let sk = this.ObjGeneral.UserInfo[0];
    // if (sk == undefined) {
    //   this.ObjGeneral.IsMovetoOrders = true;
    //   this.navCtrl.push(FurnitureLoginPage)
    // }
    // else {
    this.GeAllOrders();
    // }
  }

  onInput(event) {

    if (event.srcElement.value == "") {
      this.IsSearch = false;
      if (this.ShowOrderArrayClone.length > 0)
        this.ShwoOrderArray = this.ShowOrderArrayClone;
      else
        this.ShwoOrderArray = this.ShwoOrderArray;
    }
    else {
      //  => items.ID == event.srcElement.value);
      let Check = this.ShwoOrderArray.filter((v) => {
        // this.ObjGeneral.UserInfo[0].Key
        if (v.OrderID && event.srcElement.value) {

          if (v.OrderID.toLowerCase().indexOf(event.srcElement.value.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      });
      if (Check == undefined || Check.length == 0) {
        this.IsSearch = true;
        if (this.ShowOrderArrayClone.length > 0)
          this.ShwoOrderArray = this.ShowOrderArrayClone;
      }
      else {
        this.IsSearch = false;
        // this.ShowOrderArrayClone = this.ShwoOrderArray;
        this.ShwoOrderArray = Check;
      }
    }
    console.log(event.srcElement.value);
  }

  onCancelInput() {
    // this.ObjGeneral.UserInfo[0].Key
    this.IsSearch = false;
    if (this.ShowOrderArrayClone.length > 0)
      this.ShwoOrderArray = this.ShowOrderArrayClone;
    else
      this.ShwoOrderArray = this.ShwoOrderArray;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FurnitureViewBookorderPage');
  }

  OrderDeatils(param, Status, OrderID) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Select Your Action Againts The Order',
      buttons: [
        {
          text: 'Change Status',
          handler: () => {
            const modal = this.modalCtrl.create(FurnitureBookOrderDetailPage, { ProductInfo: param, Status: Status, OrderID: OrderID });
            modal.present();
          }
        },
        {
          text: 'View Detail',
          handler: () => {

            let Value = this.ShwoOrderArray.filter(items => items.ID == OrderID);
            const modal = this.modalCtrl.create(ViewOrderDetailPage, { OrderDate: Value, ProductInfo: param });
            modal.present();
          }
        },
        {
          text: 'Genrate Invoice',
          handler: () => {
            let Value = this.ShwoOrderArray.filter(items => items.ID == OrderID);
            this.navCtrl.push(FurnitureInvoicePage, { OrderDate: Value, ProductInfo: param });

            // alert('DisAbled');


          }
        }

      ]
    });
    if (this.ObjGeneral.UserInfo[0].isAdmin == 1) {
      actionSheet.present();
    }
  }

  OrderDeatils2(param, Status, OrderID) {
    if (this.ObjGeneral.UserInfo[0].isAdmin == 1) {

      const confirm = this.alertCtrl.create({
        title: 'Option?',
        message: 'Change Status or View Detail?',
        buttons: [
          {
            text: 'Change Status',
            handler: () => {
              const modal = this.modalCtrl.create(FurnitureBookOrderDetailPage, { ProductInfo: param, Status: Status, OrderID: OrderID });
              modal.present();
            }
          },
          {
            text: 'View Detail',
            handler: () => {

              let Value = this.ShwoOrderArray.filter(items => items.ID == OrderID);
              const modal = this.modalCtrl.create(ViewOrderDetailPage, { OrderDate: Value, ProductInfo: param });
              modal.present();
            }
          },
          // {
          //   text: 'ViewDetail',

          //   handler: () => {
          //     console.log('Agree clicked');
          //   }
          // }
        ],
        cssClass: 'SameButtonForAlert'
      });
      confirm.present();

    }
  }

  onChangeFilter(param) {
    this.ShwoOrderArray = [];
    this.ObjGeneral.UserInfo[0].Key

    if (param == "All orders") {
      // this.ShwoOrderArray = this.OrderArray;
      for (let i = 0; i < this.OrderArray.length; i++) {
        if (this.OrderArray[i].UserKey == this.ObjGeneral.UserInfo[0].Key || this.ObjGeneral.UserInfo[0].isAdmin == 1)
          this.ShwoOrderArray.push(this.OrderArray[i]);
      }
    }
    else {
      if (this.ObjGeneral.UserInfo[0].isAdmin != 1) {
        for (var loop = 0; loop < this.OrderArray.length; loop++) {
          var TempObject = {};
          if (param == "Confirm Orders") {
            if (this.OrderArray[loop].isStatus == 'Confirm' && this.OrderArray[loop].UserKey == this.ObjGeneral.UserInfo[0].Key) {
              this.ShwoOrderArray.push(this.OrderArray[loop]);
            }
          } else if (param == "Deliver Orders") {
            if (this.OrderArray[loop].isStatus == 'Deliver' && this.OrderArray[loop].UserKey == this.ObjGeneral.UserInfo[0].Key) {
              this.ShwoOrderArray.push(this.OrderArray[loop]);
            }
          } else if (param == "Return / Complete Order") {
            if (this.OrderArray[loop].isStatus == 'Complete' && this.OrderArray[loop].UserKey == this.ObjGeneral.UserInfo[0].Key) {
              this.ShwoOrderArray.push(this.OrderArray[loop]);
            }
          } else if (param == "Cancel Orders") {
            if (this.OrderArray[loop].isStatus == 'Cencel' && this.OrderArray[loop].UserKey == this.ObjGeneral.UserInfo[0].Key) {
              this.ShwoOrderArray.push(this.OrderArray[loop]);
            }
          } else if (param == "Booked Orders") {
            if (this.OrderArray[loop].isStatus == 'Booked' && this.OrderArray[loop].UserKey == this.ObjGeneral.UserInfo[0].Key) {
              this.ShwoOrderArray.push(this.OrderArray[loop]);
            }
          }
        }
      }
      else if (this.ObjGeneral.UserInfo[0].isAdmin == 1) {
        for (var loop = 0; loop < this.OrderArray.length; loop++) {
          var TempObject = {};
          if (param == "Confirm Orders") {
            if (this.OrderArray[loop].isStatus == 'Confirm') {
              this.ShwoOrderArray.push(this.OrderArray[loop]);
            }
          } else if (param == "Deliver Orders") {
            if (this.OrderArray[loop].isStatus == 'Deliver') {
              this.ShwoOrderArray.push(this.OrderArray[loop]);
            }
          } else if (param == "Return / Complete Order") {
            if (this.OrderArray[loop].isStatus == 'Complete') {
              this.ShwoOrderArray.push(this.OrderArray[loop]);
            }
          } else if (param == "Cancel Orders") {
            if (this.OrderArray[loop].isStatus == 'Cencel') {
              this.ShwoOrderArray.push(this.OrderArray[loop]);
            }
          } else if (param == "Booked Orders") {
            if (this.OrderArray[loop].isStatus == 'Booked') {
              this.ShwoOrderArray.push(this.OrderArray[loop]);
            }
          }
        }
      }

    }



  }

  GeAllOrders() {
    this.database.object('FurnitureDB/Orders').valueChanges().subscribe(data => {
      let SubArr = Object.keys(data);
      this.OrderArray = [];
      for (var loop = 0; loop < SubArr.length; loop++) {
        var Status = "";
        if (data[SubArr[loop]].IsCencle == 1) {
          Status = 'Cencel'
        }
        else if (data[SubArr[loop]].IsCencle == 0 && data[SubArr[loop]].isBooked == 0 && data[SubArr[loop]].IsDeliver == 0 && data[SubArr[loop]].Return == 0) {
          Status = 'Booked'
        }
        else if (data[SubArr[loop]].IsCencle == 0 && data[SubArr[loop]].isBooked == 1 && data[SubArr[loop]].IsDeliver == 0 && data[SubArr[loop]].Return == 0) {
          Status = 'Confirm'
        }
        else if (data[SubArr[loop]].IsCencle == 0 && data[SubArr[loop]].isBooked == 1 && data[SubArr[loop]].IsDeliver == 1 && data[SubArr[loop]].Return == 0) {
          Status = 'Deliver'
        }
        else if (data[SubArr[loop]].IsCencle == 0 && data[SubArr[loop]].isBooked == 1 && data[SubArr[loop]].IsDeliver == 1 && data[SubArr[loop]].Return == 1) {
          Status = 'Complete'
        }
        const object2 = Object.assign({ ID: SubArr[loop] }, { isStatus: Status }, data[SubArr[loop]]);

        if (this.ObjGeneral.UserInfo[0].isAdmin == 1) {
          this.OrderArray.push(object2);
        } else if (data[SubArr[loop]].UserKey == this.ObjGeneral.UserInfo[0].Key) {
          this.OrderArray.push(object2);
        }

      }
      this.OrderArray.reverse();
      this.ShwoOrderArray = this.OrderArray;
      this.ShowOrderArrayClone = this.OrderArray;

    })
  }

}
