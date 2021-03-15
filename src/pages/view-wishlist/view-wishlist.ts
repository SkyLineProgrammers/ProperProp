import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { GeneralProvider } from '../../providers/general/general';
import { FurnitureProductDescriptionPage } from '../furniture-product-description/furniture-product-description';

/**
 * Generated class for the ViewWishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-wishlist',
  templateUrl: 'view-wishlist.html',
})
export class ViewWishlistPage {

  WishList = [];
  Productarray = [];
  PrintAddtoCart = [];
  TotalAmount = -1;
  CategoryID = "";
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, private database: AngularFireDatabase, public ObjGeneral: GeneralProvider, public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewWishlistPage');
  }

  ionViewWillEnter() {
    this.GetAllProduct();
    this.GetAllWishLists();
    // setTimeout(() => {
    //   this.ShowWishlist();
    // }, 1000);
  }


  AddtoCart = [];
  GetAllAddtoCart(): Promise<Boolean> {
    return new Promise((resolve, error) => {
      this.database.object('FurnitureDB/AddtoCart/' + this.ObjGeneral.DeviceID).valueChanges().subscribe(data => {
        let SubArr = Object.keys(data);
        this.AddtoCart = [];
        for (var loop = 0; loop < SubArr.length; loop++) {
          const object2 = Object.assign({ ID: SubArr[loop] }, data[SubArr[loop]]);
          this.AddtoCart.push(object2);
        }
        return resolve(true);
      });
    });

  }

  AddListToCart() {
    let showOnce = 0;
    this.GetAllAddtoCart().then(() => {
      // loop here

      console.clear();
      console.log(this.PrintAddtoCart);
      console.log(this.AddtoCart);

      this.PrintAddtoCart.forEach(element => {


        let Check = this.AddtoCart.find(items => items.ProductID == element.ID);
        let CounterDemo = -1;
        let TotalQuantityInCart = 1;

        if (Check != undefined && Check.Product_Quantity != undefined) {
          CounterDemo = Check.Product_Quantity;
          TotalQuantityInCart = CounterDemo + 1;
        }
        if (TotalQuantityInCart <= element.Quantity) {

          this.database.list("FurnitureDB/AddtoCart/" + this.ObjGeneral.DeviceID).push({
            DeviceID: this.ObjGeneral.DeviceID,
            ProductID: element.ID,
            Product_Quantity: 1,
            ProductModificaiton: ""
          }).then((data) => {
            if (showOnce == 0) {
              const toast = this.toastCtrl.create({
                message: 'Your whole wish list added to the ADD TO CART',
                duration: 3000
              });
              toast.present();
              showOnce++;
            }

          });
        }
        else {
          const toast = this.toastCtrl.create({
            message: 'Out of Stock',
            duration: 3000
          });
          toast.present();
        }
      });

    });


  }


  GetAllWishLists() {
    this.database.object('FurnitureDB/ProductWishList/' + this.ObjGeneral.DeviceID).valueChanges().subscribe(data => {
      if (data != null) {
        let SubArr = Object.keys(data);
        this.WishList = [];
        if (SubArr != undefined && SubArr != null) {
          for (var loop = 0; loop < SubArr.length; loop++) {
            const object2 = Object.assign({ ID: SubArr[loop] }, data[SubArr[loop]]);
            this.WishList.push(object2);
          }
        }
        this.ShowWishlist();
      } else {
        this.PrintAddtoCart = [];
      }

    })
  }

  presentModal(param) {
    // if (_CatID != undefined)
    //   this.CategoryID = _CatID
    // else if (_CatID == undefined)
    //   this.CategoryID = param.Category;
    // alert(_CatID)
    const modal = this.modalCtrl.create(FurnitureProductDescriptionPage, { ProductInfo: param, CategoryName: param.Category });
    modal.present();
  }

  removeItem(index) {
    //This was for testing
    // this.PrintAddtoCart.splice(index,1);

    // let WishlistID = this.PrintAddtoCart[index].AddtoCartID;
    let ManualWishListKey = this.PrintAddtoCart[index].ManualWishListKey;

    let _ProductID = this.PrintAddtoCart[index].ID;
    this.database.list('FurnitureDB/ProductWishList/' + this.ObjGeneral.DeviceID + "/").remove(this.PrintAddtoCart[index].AddtoCartID)
      .then(() => {

        let Value = this.ObjGeneral.WishListIDs.find(items => items == ManualWishListKey);
        if (Value == undefined || Value == null)
          this.ObjGeneral.WishListIDs.push({ WishlistID: ManualWishListKey, ProductID: _ProductID });

        this.ObjGeneral.IsRemoved = true;
        // this.PrintAddtoCart.splice(index, 1);
      });
    // this.database.list("FurnitureDB/AddtoCart/" + this.ObjGeneral.DeviceID + "/").remove(object2.AddtoCartID)

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

  ShowWishlist() {
    this.PrintAddtoCart = [];
    this.TotalAmount = 0;

    for (var loop = 0; loop < this.WishList.length; loop++) {
      for (var Innerloop = 0; Innerloop < this.Productarray.length; Innerloop++) {
        if (this.WishList[loop].ProductID == this.Productarray[Innerloop].ID) {
          console.log("Price " + this.Productarray[Innerloop].Price);
          console.log("Quantity " + this.WishList[loop].Product_Quantity);
          var ProductID = this.Productarray[Innerloop].ID;
          var index = this.PrintAddtoCart.findIndex(x => x.ID == ProductID);
          if (index == -1) {
            const object2 = Object.assign({ BucketQuantity: this.WishList[loop].Product_Quantity }, { ManualWishListKey: this.WishList[loop].ManualWishListKey }, { AddtoCartID: this.WishList[loop].ID }, this.Productarray[Innerloop]);
            this.PrintAddtoCart.push(object2)
            var test = this.Productarray[Innerloop].Price * this.WishList[loop].Product_Quantity;
            this.TotalAmount = this.TotalAmount + test;
          }
          else {
            this.PrintAddtoCart[index].BucketQuantity = this.PrintAddtoCart[index].BucketQuantity + this.WishList[loop].Product_Quantity;
            var test = this.PrintAddtoCart[index].Price * this.WishList[loop].Product_Quantity;
            this.TotalAmount = this.TotalAmount + test;

            // this.database.list("FurnitureDB/AddtoCart/" + this.ObjGeneral.DeviceID + "/").update(this.PrintAddtoCart[index].AddtoCartID, {
            //   Product_Quantity: this.PrintAddtoCart[index].BucketQuantity
            // })
            // this.database.list("FurnitureDB/AddtoCart/" + this.ObjGeneral.DeviceID + "/").remove(this.WishList[loop].ID)
          }

        }
      }
    }
  }


}
