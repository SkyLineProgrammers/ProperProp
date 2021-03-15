import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { Printer, PrintOptions } from '@ionic-native/printer';
import { elementAt } from 'rxjs/operator/elementAt';
import { FurnitureDashboardPage } from '../furniture-dashboard/furniture-dashboard';
import { Platform } from 'ionic-angular/platform/platform';

/**
 * Generated class for the FurnitureInvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-furniture-invoice',
  templateUrl: 'furniture-invoice.html',
})
export class FurnitureInvoicePage {

  ProductArray = [];
  ShowOrderInfo = [];
  Discount = "0";
  DeliveryAmount = "0";
  ModificationCharges = "0";
  isprint = false;
  isForm = true;
  PrintItem = "";
  NetAmount: any;
  Logo: any;
  Footer: any;
  DesignLogo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private printer: Printer, public platform: Platform) {

    let OrderData = this.navParams.get("OrderDate");
    this.ProductArray = OrderData[0].OrderDetails;
    this.ShowOrderInfo = OrderData;
    this.Discount = this.ShowOrderInfo[0].DiscountAmount;
    this.DeliveryAmount = this.ShowOrderInfo[0].DeliveryAmount;
    this.ModificationCharges = this.ShowOrderInfo[0].ModificationAmount;

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
        this.DesignLogo = object2.Logo
        this.Logo = object2.Header
        this.Footer = object2.Bottom
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FurnitureInvoicePage');
  }


  PrintAndroidInvoice() {
    this.PrintItem = '<div class="center"><img src="' + this.Logo + '" width="100%" /></div>';
    this.PrintItem = this.PrintItem + '<div style="margin-top: 5%"><hr><div style="width: 70%; float: left"><p style="font-size: 15px" style="font-size: 15px" class="SKfontStyle">Order # :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b><span>' + this.ShowOrderInfo[0].OrderID + '</span></b></p>' +
      '<p style="font-size: 15px" class="SKfontStyle">Client Name :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b><span>' + this.ShowOrderInfo[0].Name + '</span></b></p><p style="font-size: 15px" class="SKfontStyle">Departure Date :&nbsp;&nbsp; <b><span>' + this.ShowOrderInfo[0].FromDate + '</span></b></p><p style="font-size: 15px" class="SKfontStyle">Arival Date :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b><span>' + this.ShowOrderInfo[0].ToDate + '</span></b></p></div>' +
      '<div style="width: 30%; float: left"><p style="font-size: 15px" class="SKfontStyle">Order Date : <b><span>' + this.ShowOrderInfo[0].OrderDate + '</span></b></p></div><hr style="clear: both"></div>';

    this.PrintItem = this.PrintItem + ' <table cellpadding="10px" border="1" cellspacing="0" width="100%">'
    this.PrintItem = this.PrintItem + '<tr><th style="  font-family: "Comfortaa", cursive;">Description</th>' + '<th style="  font-family: "Comfortaa", cursive;">QTY</th>' + '<th style="  font-family: "Comfortaa", cursive;">Rate</th><th style="  font-family: "Comfortaa", cursive;">Amount</th><th style="font-family: "Comfortaa", cursive;">Picture</th></tr>';
    // for(let loop = 0; loop < 11; loop++ ){

    this.ProductArray.forEach(element => {
      this.PrintItem = this.PrintItem + '<tr><td style="text-align: center; font-family: "Comfortaa", cursive;">' + element.ProductName + '</td><td style="text-align: center; font-family: "Comfortaa", cursive;">' + element.BucketQuantity + '</td><td style="text-align: center; font-family: "Comfortaa", cursive;">' + element.Price + '/=</td><td style="text-align: center; font-family: "Comfortaa", cursive;">' + element.Price * element.BucketQuantity + '/=</td><td style="text-align: center; font-family: "Comfortaa", cursive;"><img src="' + element.Image1 + '" width="70px" height="70px" /></td></tr>';
    });
    // this.PrintItem = this.PrintItem + '<tr><td style="text-align: center; font-family: "Comfortaa", cursive;">'+{{element.ProductName}}+'</td><td style="text-align: center; font-family: "Comfortaa", cursive;">'+{{element.BucketQuantity}}+'</td><td style="text-align: center; font-family: "Comfortaa", cursive;">'+{{element.Price}}+'/=</td><td style="text-align: center; font-family: "Comfortaa", cursive;">'+{{ (element.Price * element.BucketQuantity) }}+'/=</td><td style="text-align: center; font-family: "Comfortaa", cursive;"><img src="'+element.Image1+'" width="70px" height="70px" /></td></tr>';

    // }
    this.PrintItem = this.PrintItem + '</table>';
    this.PrintItem = this.PrintItem + '<div><hr><br><br><div style="width: 5%; float: left"><br><br></div><div style="width: 85%; float: left"><div style="width: 45%; float: left"><p style="font-size: 15px" class="SKfontStyle">No. Of Days : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><span>' + this.ShowOrderInfo[0].NoOfDays + '</span></b></p><p style="font-size: 15px" style="font-size: 15px" class="SKfontStyle">Sub Total :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><span>' + this.ShowOrderInfo[0].NetAmount + '/=</span></b></p><p style="font-size: 15px" class="SKfontStyle">Delivery Charges :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b><span>' + this.DeliveryAmount + '/=</span></b></p><p style="font-size: 15px" class="SKfontStyle">Modification Charges :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b><span>' + this.ModificationCharges + '/=</span></b></p><p style="font-size: 15px" class="SKfontStyle">Discount Amount:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b><span>' + this.Discount + '/=</span></b></p><p style="font-size: 15px" class="SKfontStyle">Net Amount :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><span>' + this.NetAmount + '/=</span></b></p></div><div style="width: 55%; float: left"><p style=" font-family: "Comfortaa", cursive; border: solid 2px black; font-size: 12px; padding: 5px; margin-top: 10%"><b>Note:</b> <br> 100% payment will be requried perior renting .<br> 100% should be paid on major damged items. <br> Repairing cost should be paid for repairable damaged items .</p></div></div><hr style="clear: both"></div>';
    this.PrintItem = this.PrintItem + '<br><br><div class="center"><img src="' + this.Footer + '" width="100%" /></div>';
    this.printer.isAvailable();

    let options: PrintOptions = {
      name: 'MyDocument',
      printerId: 'printer007',
      duplex: true,
      landscape: true,
      grayscale: true
    };
    setTimeout(() => {
      this.printer.print(this.PrintItem, options);
    }, 1000);
  }

  PrintIosInvoice() {
    // this.PrintItem = '<div class="center"><img src="' + this.Logo + '" width="100%" /></div>';
    this.PrintItem = this.PrintItem + '<div style="margin-top: 10%"><hr><div style="width: 70%; float: left"><p style="font-size: 15px" style="font-size: 15px" class="SKfontStyle">Order # :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b><span>' + this.ShowOrderInfo[0].OrderID + '</span></b></p>' +
      '<p style="font-size: 15px" class="SKfontStyle">Client Name :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b><span>' + this.ShowOrderInfo[0].Name + '</span></b></p><p style="font-size: 15px" class="SKfontStyle">Departure Date :&nbsp;&nbsp; <b><span>' + this.ShowOrderInfo[0].FromDate + '</span></b></p><p style="font-size: 15px" class="SKfontStyle">Arival Date :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b><span>' + this.ShowOrderInfo[0].ToDate + '</span></b></p></div>' +
      '<div style="width: 30%; float: left"><p style="font-size: 15px" class="SKfontStyle">Order Date : <b><span>' + this.ShowOrderInfo[0].OrderDate + '</span></b></p></div><hr style="clear: both"></div>';

    this.PrintItem = this.PrintItem + ' <table cellpadding="10px" border="1" cellspacing="0" width="100%">'
    this.PrintItem = this.PrintItem + '<tr><th style="  font-family: "Comfortaa", cursive;">Description</th>' + '<th style="  font-family: "Comfortaa", cursive;">QTY</th>' + '<th style="  font-family: "Comfortaa", cursive;">Rate</th><th style="  font-family: "Comfortaa", cursive;">Amount</th></tr>';
    // for(let loop = 0; loop < 11; loop++ ){

    this.ProductArray.forEach(element => {
      this.PrintItem = this.PrintItem + '<tr><td style="text-align: center; font-family: "Comfortaa", cursive;">' + element.ProductName + '</td><td style="text-align: center; font-family: "Comfortaa", cursive;">' + element.BucketQuantity + '</td><td style="text-align: center; font-family: "Comfortaa", cursive;">' + element.Price + '/=</td><td style="text-align: center; font-family: "Comfortaa", cursive;">' + element.Price * element.BucketQuantity + '/=</td></tr>';
    });
    // this.PrintItem = this.PrintItem + '<tr><td style="text-align: center; font-family: "Comfortaa", cursive;">'+{{element.ProductName}}+'</td><td style="text-align: center; font-family: "Comfortaa", cursive;">'+{{element.BucketQuantity}}+'</td><td style="text-align: center; font-family: "Comfortaa", cursive;">'+{{element.Price}}+'/=</td><td style="text-align: center; font-family: "Comfortaa", cursive;">'+{{ (element.Price * element.BucketQuantity) }}+'/=</td><td style="text-align: center; font-family: "Comfortaa", cursive;"><img src="'+element.Image1+'" width="70px" height="70px" /></td></tr>';

    // }
    this.PrintItem = this.PrintItem + '</table>';
    this.PrintItem = this.PrintItem + '<div><hr><br><br><div style="width: 5%; float: left"><br><br></div><div style="width: 85%; float: left"><div style="width: 45%; float: left"><p style="font-size: 15px" class="SKfontStyle">No. Of Days : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><span>' + this.ShowOrderInfo[0].NoOfDays + '</span></b></p><p style="font-size: 15px" style="font-size: 15px" class="SKfontStyle">Sub Total :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><span>' + this.ShowOrderInfo[0].NetAmount + '/=</span></b></p><p style="font-size: 15px" class="SKfontStyle">Delivery Charges :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b><span>' + this.DeliveryAmount + '/=</span></b></p><p style="font-size: 15px" class="SKfontStyle">Modification Charges :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b><span>' + this.ModificationCharges + '/=</span></b></p><p style="font-size: 15px" class="SKfontStyle">Discount Amount:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b><span>' + this.Discount + '/=</span></b></p><p style="font-size: 15px" class="SKfontStyle">Net Amount :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><span>' + this.NetAmount + '/=</span></b></p></div><div style="width: 55%; float: left"><p style=" font-family: "Comfortaa", cursive; border: solid 2px black; font-size: 12px; padding: 5px; margin-top: 10%"><b>Note:</b> <br> 100% payment will be requried perior renting .<br> 100% should be paid on major damged items. <br> Repairing cost should be paid for repairable damaged items .</p></div></div><hr style="clear: both"></div>';
    // this.PrintItem = this.PrintItem + '<br><br><div class="center"><img src="' + this.Footer + '" width="100%" /></div>';
    this.printer.isAvailable();

    let options: PrintOptions = {
      name: 'MyDocument',
      printerId: 'printer007',
      duplex: true,
      landscape: true,
      grayscale: true
    };
    setTimeout(() => {
      this.printer.print(this.PrintItem, options);
    }, 1000);
  }

  GenerateInvoice() {
    this.NetAmount = 0; // 0

    this.NetAmount = parseFloat(this.ShowOrderInfo[0].NetAmount) * parseFloat(this.ShowOrderInfo[0].NoOfDays); // 26000 * 15 = 390000
    this.NetAmount = this.NetAmount + parseFloat(this.DeliveryAmount.toString()); //390000 + 200 = 
    this.NetAmount = parseFloat(this.NetAmount) - parseFloat(this.Discount.toString()) + parseFloat(this.ModificationCharges.toString());

    if (this.platform.is('ios')) {
      alert('IOS');
      this.PrintIosInvoice();
    } else {
      alert('ANDROID');
      this.PrintAndroidInvoice();
    }


    // alert(this.NetAmount);
    // this.isForm = false;
    // this.isprint = true;
    // this.database.list('FurnitureDB/Orders/').update(this.ShowOrderInfo[0].ID, {
    //   DiscountAmount: this.Discount,
    //   DeliveryAmount: this.DeliveryAmount,
    //   ModificationAmount: this.ModificationCharges
    // }).then(x => {
    //   // this.PrintInvoice();
    //   this.navCtrl.setRoot(FurnitureDashboardPage);
    // })

    // console.log(this.ShowOrderInfo[0]);

    // this.printer.isAvailable();

    // let options: PrintOptions = {
    //   name: 'MyDocument',
    //   printerId: 'printer007',
    //   duplex: true,
    //   landscape: true,
    //   grayscale: true
    // };

    // var text = '<div style="display: block; margin-left: auto; margin-right: auto; width: 70%;">< img src = "assets/imgs/top.png" /> </div> <div style="margin-top: 5%; padding: 2%;"> <hr> <div style="width: 70%; float: left"> <p style="font-size: 15px" style="font-size: 15px" style="font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">Order #<br> <b> <span>00122</span> </b> </p> <p style="font-size: 15px" style="font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">Client Name<br> <b> <span>Ibtesam Ahmed</span> </b> </p> <p style="font-size: 15px" style="font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">Departure Date<br> <b> <span>12-05-2020</span> </b> </p> <p style="font-size: 15px" style="font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">Arival Date <br> <b> <span>13-12-2020</span> </b> </p> </div> <div style="width: 30%; float: left"> <p style="font-size: 15px" style="font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">Date : <b> <span>534535</span> </b> </p> </div> <hr style="clear: both"> </div> <table border="1" cellspacing="0" width="100%" style="padding: 5%;"> <tr> <th style=" font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif; text-align: center"> Description</th> <th style=" font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif; text-align: center;"> QTY</th> <th style=" font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif; text-align: center"> Rate</th> <th style=" font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif; text-align: center"> Amount</th> <th style=" font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif; text-align: center"> Pictures</th> </tr> <tr> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> Propduct One</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">5 </td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> 15000/=</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> 75000/=</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> <img src="https://images-na.ssl-images-amazon.com/images/I/41JjoGcG36L._SL500_.jpg" width="70px" height="70px" /> </td> </tr> <tr> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> Propduct One</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">5 </td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> 15000/=</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> 75000/=</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> <img src="https://images-na.ssl-images-amazon.com/images/I/41JjoGcG36L._SL500_.jpg" width="70px" height="70px" /> </td> </tr> <tr> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> Propduct One</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">5 </td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> 15000/=</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> 75000/=</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> <img src="https://images-na.ssl-images-amazon.com/images/I/41JjoGcG36L._SL500_.jpg" width="70px" height="70px" /> </td> </tr> <tr> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> Propduct One</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">5 </td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> 15000/=</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> 75000/=</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> <img src="https://images-na.ssl-images-amazon.com/images/I/41JjoGcG36L._SL500_.jpg" width="70px" height="70px" /> </td> </tr> <tr> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> Propduct One</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">5 </td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> 15000/=</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> 75000/=</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> <img src="https://images-na.ssl-images-amazon.com/images/I/41JjoGcG36L._SL500_.jpg" width="70px" height="70px" /> </td> </tr> <tr> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> Propduct One</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">5 </td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> 15000/=</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> 75000/=</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> <img src="https://images-na.ssl-images-amazon.com/images/I/41JjoGcG36L._SL500_.jpg" width="70px" height="70px" /> </td> </tr> <tr> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> Propduct One</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">5 </td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> 15000/=</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> 75000/=</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> <img src="https://images-na.ssl-images-amazon.com/images/I/41JjoGcG36L._SL500_.jpg" width="70px" height="70px" /> </td> </tr> <tr> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> Propduct One</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">5 </td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> 15000/=</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> 75000/=</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> <img src="https://images-na.ssl-images-amazon.com/images/I/41JjoGcG36L._SL500_.jpg" width="70px" height="70px" /> </td> </tr> <tr> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> Propduct One</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">5 </td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> 15000/=</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> 75000/=</td> <td style="text-align: center; font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;"> <img src="https://images-na.ssl-images-amazon.com/images/I/41JjoGcG36L._SL500_.jpg" width="70px" height="70px" /> </td> </tr> </table> <div style="padding: 5%;"> <hr> <div style="width: 100%; float: left"> <div style="width: 55%; float: left"> <p style="font-size: 15px" style="font-size: 15px" style="font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">Sub Total : <b> <span>(15,000/=)</span> </b> </p> <p style="font-size: 15px" style="font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">Delivery Charges : <b> <span>(500/=)</span> </b> </p> <p style="font-size: 15px" style="font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">Modification Charges : <b> <span>(15000/=)</span> </b> </p> <p style="font-size: 15px" style="font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">Discount : <b> <span>(1000/=)</span> </b> </p> <p style="font-size: 15px" style="font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;">Net Amount <b> <span>(29,500/=)</span> </b> </p> </div> <div style="width: 45%; float: left"> <p style=" font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif; border: solid 2px black; font-size: 10px; padding: 5px; margin-top: 0%"> <b>Note:</b> <br> 100% payment will be requried perior renting . <br> 100% should be paid on major damged items . <br> Repairing cost should be paid for repairable damaged items . </p> </div> </div> <hr style="clear: both"> </div> <img width="100%" src="assets/imgs/headerBottom.png" />';

    // this.printer.print(text, options)

  }

}
