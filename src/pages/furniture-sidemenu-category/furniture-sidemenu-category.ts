import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { FurnitureProductDescriptionPage } from "../furniture-product-description/furniture-product-description";
import { GeneralProvider } from "../../providers/general/general";
import firebase from 'firebase';

/**
 * Generated class for the FurnitureSidemenuCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-furniture-sidemenu-category',
  templateUrl: 'furniture-sidemenu-category.html',
})
export class FurnitureSidemenuCategoryPage {
  TempProductArrayLeft = [];
  WishListArray = [];
  CategoryID: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private database: AngularFireDatabase, private ObjGeneralHelper: GeneralProvider, public toastCtrl: ToastController) {
    var catId = this.navParams.get('CatName');
    // this.CategoryImage = this.navParams.get('categoryImage');
    this.CategoryID = catId;
    this.GetAllWishList();
    this.GetAllProduct();
  }

  ionViewWillEnter() {
    if (this.ObjGeneralHelper.WishListIDs.length > 0) {
      // if (this.ObjGeneralHelper.IsRemoved) {
      for (let i = 0; i < this.ObjGeneralHelper.WishListIDs.length; i++) {
        let Value = this.TempProductArrayLeft.find(items => items.ID == this.ObjGeneralHelper.WishListIDs[i].ProductID)
        if (Value != undefined) {
          let index = this.TempProductArrayLeft.indexOf(Value);
          this.TempProductArrayLeft[index].isWishList = 0;
          this.TempProductArrayLeft[index].WishlistID = this.ObjGeneralHelper.WishListIDs[i].WishlistID;
          this.ObjGeneralHelper.WishListIDs.splice(i, 1);
        }
        // }
        this.ObjGeneralHelper.IsRemoved = false;

      }
    }

    if (this.ObjGeneralHelper.ProductIDs.length > 0) {
      // if (this.ObjGeneralHelper.IsAdded) {
      for (let i = 0; i < this.ObjGeneralHelper.ProductIDs.length; i++) {
        let Value = this.TempProductArrayLeft.find(items => items.ID == this.ObjGeneralHelper.ProductIDs[i])
        if (Value != undefined) {
          let index = this.TempProductArrayLeft.indexOf(Value);
          this.TempProductArrayLeft[index].isWishList = 1;
          // this.ObjGeneralHelper.WishListIDs.splice(i, 1);
        }
      }

      this.ObjGeneralHelper.IsAdded = false;
      // }
    }
  }


  presentModal(param) {
    const modal = this.modalCtrl.create(FurnitureProductDescriptionPage, { ProductInfo: param, CategoryName: this.CategoryID })
    modal.present();

    modal.onDidDismiss(() => {
      
      if (this.ObjGeneralHelper.WishListIDs.length > 0) {
        // if (this.ObjGeneralHelper.IsRemoved) {
        for (let i = 0; i < this.ObjGeneralHelper.WishListIDs.length; i++) {
          let Value = this.TempProductArrayLeft.find(items => items.ID == this.ObjGeneralHelper.WishListIDs[i].ProductID)
          if (Value != undefined) {
            let index = this.TempProductArrayLeft.indexOf(Value);
            this.TempProductArrayLeft[index].isWishList = 0;
            this.TempProductArrayLeft[index].WishlistID = this.ObjGeneralHelper.WishListIDs[i].WishlistID;
            this.ObjGeneralHelper.WishListIDs.splice(i, 1);
          }
          // }
          this.ObjGeneralHelper.IsRemoved = false;

        }
      }

      if (this.ObjGeneralHelper.ProductIDs.length > 0) {
        // if (this.ObjGeneralHelper.IsAdded) {
        for (let i = 0; i < this.ObjGeneralHelper.ProductIDs.length; i++) {
          let Value = this.TempProductArrayLeft.find(items => items.ID == this.ObjGeneralHelper.ProductIDs[i])
          if (Value != undefined) {
            let index = this.TempProductArrayLeft.indexOf(Value);
            this.TempProductArrayLeft[index].isWishList = 1;
            // this.ObjGeneralHelper.WishListIDs.splice(i, 1);
          }
        }

        this.ObjGeneralHelper.IsAdded = false;
        // }
      }
    });

  }



  // BtnAddtoWishListClick(_ProductID) {
  //   if (_ProductID != null && _ProductID != undefined)
  //     this.AddToWishlist(_ProductID);
  // }



  GetAllWishList() {
    // this.database.object('FurnitureDB/ProductWishList/TestingSK').valueChanges().subscribe(data => {
    this.database.object('FurnitureDB/ProductWishList/' + this.ObjGeneralHelper.DeviceID).valueChanges().subscribe(data => {
      if (data != undefined || data != null) {
        let SubArr = Object.keys(data);
        this.WishListArray = [];
        for (var loop = 0; loop < SubArr.length; loop++) {
          const object2 = Object.assign({ ID: SubArr[loop] }, data[SubArr[loop]]);
          this.WishListArray.push(object2);
        }
      }
      // 
    })
  }


  // BtnAddtoWishListClick(_ProductID) {
  //   let CheckWishList = 0;
  //   if (_ProductID != null && _ProductID != undefined) {
  //     this.WishListArray.forEach(element => {
  //       if (element.ProductID == _ProductID) {
  //         CheckWishList = 1;
  //       }
  //     });
  //   }
  //   if (CheckWishList == 0) {
  //     this.AddToWishlist(_ProductID);
  //   }
  //   else {
  //     const toast = this.toastCtrl.create({
  //       message: 'Already Added to wishlist',
  //       duration: 1000
  //     });
  //     toast.present();
  //   }
  // }
  isWishList = 0;

  BtnAddtoWishListClick(_ProductID, isWishList) {

    let CheckWishList = 0;
    let WishListID = "-1";
    let WishListIndex = -1;
    if (_ProductID != null && _ProductID != undefined) {
      // this.WishListArray.forEach(element => {

      //   if (element.ProductID == _ProductID) {
      //     CheckWishList = 1;
      //     WishListID = element.ID;
      //   }
      // });

      let Value = this.WishListArray.find(items => items.ProductID == _ProductID);
      if (Value != undefined) {
        CheckWishList = 1;
        WishListID = Value.ID;
        WishListIndex = this.WishListArray.indexOf(Value);
      }

    }
    if (CheckWishList == 0) {
      this.AddToWishlist(_ProductID);
    }
    else {
      // Commented by Muzammil on 2/28/19
      // const toast = this.toastCtrl.create({
      //   message: 'Already Added to wishlist',
      //   duration: 1000
      // });
      // toast.present();

      // Added by Muzammil
      if (WishListID != "-1") {
        this.database.list('FurnitureDB/ProductWishList/' + this.ObjGeneralHelper.DeviceID + "/").remove(WishListID)
          .then(() => {

            this.WishListArray.splice(WishListIndex, 1)
            var index = this.TempProductArrayLeft.findIndex(x => x.ID == _ProductID);
            this.TempProductArrayLeft[index].isWishList = 0;
            this.TempProductArrayLeft[index].WishListID = -1;

            if (this.ObjGeneralHelper.ProductIDs.length > 0) {
              let Value = this.ObjGeneralHelper.ProductIDs.find(items => items == _ProductID);
              if (Value != undefined) {
                this.ObjGeneralHelper.ProductIDs.indexOf(Value);
                this.ObjGeneralHelper.ProductIDs.splice(index, 1);
              }
            }
            let Value2 = this.ObjGeneralHelper.WishListIDs.find(items => items == WishListID);
            if (Value2 == undefined || Value2 == null)
              this.ObjGeneralHelper.WishListIDs.push({ WishlistID: WishListID, ProductID: _ProductID });

          });
      }
    }
  }

  AddToWishlist(_ProductID) {
    var WishListKey = firebase.database().ref().child('ProductWishList').push().key

    this.database.list("FurnitureDB/ProductWishList/" + this.ObjGeneralHelper.DeviceID).push({
      DeviceID: this.ObjGeneralHelper.DeviceID,
      ProductID: _ProductID,
      Product_Quantity: 1,
      ManualWishListKey: WishListKey

    }).then(() => {
      var index = this.TempProductArrayLeft.findIndex(x => x.ID == _ProductID);
      this.TempProductArrayLeft[index].isWishList = 1;
      this.TempProductArrayLeft[index].WishListID = WishListKey;

      // if (this.ObjGeneralHelper.ProductIDs.length > 0) {
      let Find = this.ObjGeneralHelper.ProductIDs.find(items => items == _ProductID)
      if (Find == undefined || Find == null)
        this.ObjGeneralHelper.ProductIDs.push(_ProductID);
      // }

      this.ObjGeneralHelper.IsAdded = true;
      const toast = this.toastCtrl.create({
        message: 'Added to wishlist',
        duration: 3000
      });
      toast.present();
    });
  }

  GetAllProduct() {
    this.database.object('FurnitureDB/Product').valueChanges().subscribe(data => {
      let SubArr = Object.keys(data);
      this.TempProductArrayLeft = [];
      for (var loop = 0; loop < SubArr.length; loop++) {
        let isWishList = 0;
        if (this.CategoryID == data[SubArr[loop]].Category) {
          this.WishListArray.forEach(element => {
            if (element.ProductID == SubArr[loop]) {
              isWishList = 1;
            }
          });
          const object2 = Object.assign({ ID: SubArr[loop] }, { isWishList: isWishList }, data[SubArr[loop]]);
          // if (loop % 2 == 0) {
          this.TempProductArrayLeft.push(object2);
          // }
          // else {
          //   this.TempProductArrayRight.push(object2)
          // }
        }
      }

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FurnitureSidemenuCategoryPage');
  }

}
