import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { GeneralProvider } from '../../providers/general/general';
import { FurnitureCatViewPage } from "../furniture-cat-view/furniture-cat-view";
import { FurnitureAddtocartPage } from "../furniture-addtocart/furniture-addtocart";
import { Device } from '@ionic-native/device';
import { FurnitureProductPage } from '../furniture-product/furniture-product';
import { SocialSharing } from '@ionic-native/social-sharing';
import firebase from 'firebase';
import { FurnitureBookorderPage } from '../furniture-bookorder/furniture-bookorder';
import { FurnitureLoginPage } from '../furniture-login/furniture-login';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { FurniturePhotoSliderModalPage } from '../furniture-photo-slider-modal/furniture-photo-slider-modal';

/**
 * Generated class for the FurnitureProductDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-furniture-product-description',
  templateUrl: 'furniture-product-description.html',
})
export class FurnitureProductDescriptionPage {
  Productarray: any;
  TotalAmount: number;
  PrintAddtoCart: any;
  ProductArrayLeft = [];
  catName: any;

  public ProductName = "";
  public ProductDetail = "";
  public counter = 0;
  public ProductKey = "";
  public ProductInfo = [];
  public BuutonName = "ADD TO CART";
  public Image1 = "";
  public Image2 = "";
  public Image3 = "";
  ProductPrice = 0;
  CurrentProductQuantity = -1;
  WishListArray = [];


  IsModifidicationAllowed = false;
  ProductModification = "";
  isWishList = 0;
  ShowImage = "";
  // DeviceID = "0";




  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private database: AngularFireDatabase, private ObjGeneral: GeneralProvider, private device: Device, public modalCtrl: ModalController, public toastCtrl: ToastController, private socialSharing: SocialSharing, private photoViewer: PhotoViewer) {

    // this.DeviceID = this.device.uuid
    // alert("Device ID " + this.DeviceID);
    // this.getAddToCart();
    this.ProductInfo = this.navParams.get('ProductInfo');
    this.ProductName = this.ProductInfo['ProductName'];
    this.ProductDetail = this.ProductInfo['Description'];
    this.Image1 = this.ProductInfo['Image2'];
    this.Image2 = this.ProductInfo['Image3'];
    this.Image3 = this.ProductInfo['Image4'];
    this.ProductKey = this.ProductInfo['ID'];
    // alert(this.ProductKey);
    this.ProductPrice = this.ProductInfo["Price"]
    this.catName = this.navParams.get('CategoryName');
    this.CurrentProductQuantity = this.ProductInfo["Quantity"];
    this.IsModifidicationAllowed = this.ProductInfo["IsModificationAllowed"];
    this.GetAllWishList();
    this.GetAllProduct();
    this.GetProduct();
    if (this.Image1 == "" || this.Image1 == undefined || this.Image1 == null)
      this.Image1 = "http://www.fandyschairs.co.uk/home-gall/3.jpg"
    if (this.Image2 == "" || this.Image2 == undefined || this.Image2 == null)
      this.Image2 = "https://i.pinimg.com/originals/29/a9/c0/29a9c0b3de872ad84b3b23898f787480.jpg"
    if (this.Image3 == "" || this.Image3 == undefined || this.Image3 == null)
      this.Image3 = "https://www.knoll.com/media/381/142/antenna-tables-and-deaks-chapters-low-1.jpg"

  }


  ModalTesting() {
    const modal = this.modalCtrl.create(FurniturePhotoSliderModalPage, {
      img1: this.Image1, img2: this.Image2, img3: this.Image3
    });
    modal.present();
  }

  ViewPhoto(param) {
    this.ShowImage = param;



    // this.photoViewer.show(param, '', {share: true});
    //   var options = {
    //     share: true, // default is false
    //     closeButton: false, // default is true
    //     copyToReference: true, // default is false
    //     headers: '',  // If this is not provided, an exception will be triggered
    //     piccasoOptions: { } // If this is not provided, an exception will be triggered
    // };

    // this.photoViewer.show(param, 'Optional Title', options);
  }

  GetProduct() {
    this.database.object('FurnitureDB/Product').valueChanges().subscribe(data => {
      let SubArr = Object.keys(data);
      this.Productarray = [];
      for (var loop = 0; loop < SubArr.length; loop++) {
        const object2 = Object.assign({ ID: SubArr[loop] }, data[SubArr[loop]]);
        this.Productarray.push(object2);
      }
    })
  }

  presentModal(param) {
    this.navCtrl.pop();
    const modal = this.modalCtrl.create(FurnitureProductDescriptionPage, { ProductInfo: param, CategoryName: this.catName });

    modal.present();
  }

  ionViewWillEnter() {
    if (this.ObjGeneral.WishListIDs.length > 0) {
      // if (this.ObjGeneralHelper.IsRemoved) {
      for (let i = 0; i < this.ObjGeneral.WishListIDs.length; i++) {
        let Value = this.ProductArrayLeft.find(items => items.ID == this.ObjGeneral.WishListIDs[i].ProductID)
        if (Value != undefined) {
          let index = this.ProductArrayLeft.indexOf(Value);
          this.ProductArrayLeft[index].isWishList = 0;
          this.ProductArrayLeft[index].WishListID = this.ObjGeneral.WishListIDs[i].WishlistID;
          this.ObjGeneral.WishListIDs.splice(i, 1);
        }
        // }
        this.ObjGeneral.IsRemoved = false;

      }
    }

    if (this.ObjGeneral.ProductIDs.length > 0) {
      // if (this.ObjGeneralHelper.IsAdded) {
      for (let i = 0; i < this.ObjGeneral.ProductIDs.length; i++) {
        let Value = this.ProductArrayLeft.find(items => items.ID == this.ObjGeneral.ProductIDs[i])
        if (Value != undefined) {
          let index = this.ProductArrayLeft.indexOf(Value);
          this.ProductArrayLeft[index].isWishList = 1;
          // this.ObjGeneralHelper.WishListIDs.splice(i, 1);
        }
      }

      this.ObjGeneral.IsAdded = false;
      // }
    }
  }

  GotoOrder() {
    this.navCtrl.push(FurnitureAddtocartPage);
  }

  GetAllWishList() {
    // this.database.object('FurnitureDB/ProductWishList/TestingSK').valueChanges().subscribe(data => {
    this.database.object('FurnitureDB/ProductWishList/' + this.ObjGeneral.DeviceID).valueChanges().subscribe(data => {

      if (data != undefined || data != null) {
        let SubArr = Object.keys(data);
        this.WishListArray = [];
        for (var loop = 0; loop < SubArr.length; loop++) {
          const object2 = Object.assign({ ID: SubArr[loop] }, data[SubArr[loop]]);
          this.WishListArray.push(object2);
          if (this.ProductKey == object2.ProductID) {
            this.isWishList = 1;
          }
        }
      }
      // 
    })
  }

  GetAllProduct() {
    this.database.object('FurnitureDB/Product').valueChanges().subscribe(data => {
      let SubArr = Object.keys(data);
      this.ProductArrayLeft = [];
      for (var loop = 0; loop < SubArr.length; loop++) {
        let isWishList = 0;
        this.WishListArray.forEach(element => {
          if (element.ProductID == SubArr[loop]) {
            isWishList = 1;
          }
        });
        if (this.catName == data[SubArr[loop]].Category) {
          // const object2 = Object.assign({ ID: SubArr[loop] }, data[SubArr[loop]]);
          const object2 = Object.assign({ ID: SubArr[loop] }, { isWishList: isWishList }, data[SubArr[loop]]);
          this.ProductArrayLeft.push(object2);
        }
      }

    })
  }


  // BtnAddtoWishListClick(_ProductID) {
  //   
  //   let CheckWishList = 0;
  //   if (_ProductID != null && _ProductID != undefined) {
  //     this.WishListArray.forEach(element => {
  //       if (element.ProductID == _ProductID) {
  //         CheckWishList = 1;
  //       }
  //     });
  //   }
  //   if (CheckWishList == 0) {
  //     this.AddToWishlist(_ProductID, 1);
  //   }
  //   else {
  //     const toast = this.toastCtrl.create({
  //       message: 'Already Added to wishlist',
  //       duration: 1000
  //     });
  //     toast.present();
  //   }
  // }

  BtnAddtoWishListClick(_ProductID, isWishList, IsFromLoop) {

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
      this.AddToWishlist(_ProductID, 1);
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
        this.database.list('FurnitureDB/ProductWishList/' + this.ObjGeneral.DeviceID + "/").remove(WishListID)
          .then(() => {

            this.WishListArray.splice(WishListIndex, 1)

            if (IsFromLoop == 0) {
              var index = this.ProductArrayLeft.findIndex(x => x.ID == _ProductID);
              this.ProductArrayLeft[index].isWishList = 0;
            }
            else
              this.isWishList = 0;

            if (this.ObjGeneral.ProductIDs.length > 0) {
              let Value = this.ObjGeneral.ProductIDs.find(items => items == _ProductID);
              if (Value != undefined) {
                this.ObjGeneral.ProductIDs.indexOf(Value);
                this.ObjGeneral.ProductIDs.splice(index, 1);
              }
            }

            let Value2 = this.ObjGeneral.WishListIDs.find(items => items == WishListID);
            if (Value2 == undefined || Value2 == null)
              this.ObjGeneral.WishListIDs.push({ WishlistID: WishListID, ProductID: _ProductID });
          });
      }
    }
  }

  AddToWishlist(_ProductID, Check) {
    var WishListKey = firebase.database().ref().child('ProductWishList').push().key

    this.database.list("FurnitureDB/ProductWishList/" + this.ObjGeneral.DeviceID).push({
      DeviceID: this.ObjGeneral.DeviceID,
      ProductID: _ProductID,
      Product_Quantity: 1,
      ManualWishListKey: WishListKey
    }).then(() => {

      if (Check == 0) {
        this.isWishList = 1;
      } else {
        var index = this.ProductArrayLeft.findIndex(x => x.ID == _ProductID);
        this.ProductArrayLeft[index].isWishList = 1;
        this.ProductArrayLeft[index].WishListID = WishListKey;
        // if (this.ObjGeneral.ProductIDs.length > 0) {
        let Find = this.ObjGeneral.ProductIDs.find(items => items == _ProductID)
        if (Find == undefined || Find == null)
          this.ObjGeneral.ProductIDs.push(_ProductID);
        // }
        this.ObjGeneral.IsAdded = true;

      }
      const toast = this.toastCtrl.create({
        message: 'Added to wishlist',
        duration: 3000
      });
      toast.present();
    });
  }

  BtnShareClick() {
    this.socialSharing.share("This is Furniture Demo Share", "Furniture Sharing", "", "https://www.google.com").then(() => {

    })
  }

  // AddToCart() {
  //   if (this.BuutonName == "ADD TO CART") {
  //     this.database.list("FurnitureDB/AddtoCart/" + this.ObjGeneral.DeviceID).push({
  //       DeviceID: this.ObjGeneral.DeviceID,
  //       ProductID: this.ProductKey,
  //       Product_Quantity: this.counter
  //     });
  //     this.BuutonName = "CONTINUE SHOPPING"
  //   }
  //   else {
  //     this.navCtrl.push(FurnitureCatViewPage);
  //   }
  // }

  AddtoCart = [];
  GetAllAddtoCart(): Promise<Boolean> {
    return new Promise((resolve, error) => {
      this.database.object('FurnitureDB/AddtoCart/' + this.ObjGeneral.DeviceID).valueChanges().subscribe(data => {
        if (data != null) {
          let SubArr = Object.keys(data);
          this.AddtoCart = [];
          for (var loop = 0; loop < SubArr.length; loop++) {
            const object2 = Object.assign({ ID: SubArr[loop] }, data[SubArr[loop]]);
            this.AddtoCart.push(object2);
          }
        }
        return resolve(true);
      });
    });

  }

  BookOrder() {
    this.ShowAddtoCart();
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

    for (var loop = 1; loop < this.AddtoCart.length; loop++) {
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

  AddToCart() {
    debugger;
    if (this.BuutonName == "ADD TO CART") {
      if (this.counter > 0) {
        this.GetAllAddtoCart().then(() => {
          // loop here
          let Check = this.AddtoCart.find(items => items.ProductID == this.ProductKey);
          let CounterDemo = -1;
          let TotalQuantityInCart = this.counter;

          if (Check != undefined && Check.Product_Quantity != undefined) {
            CounterDemo = Check.Product_Quantity;
            TotalQuantityInCart = CounterDemo + this.counter;
          }
          if (TotalQuantityInCart <= this.CurrentProductQuantity) {

            this.database.list("FurnitureDB/AddtoCart/" + this.ObjGeneral.DeviceID).push({
              DeviceID: this.ObjGeneral.DeviceID,
              ProductID: this.ProductKey,
              Product_Quantity: this.counter,
              ProductModificaiton: this.ProductModification
            });
            this.BuutonName = "CONTINUE";
          }
          else {
            const toast = this.toastCtrl.create({
              message: 'Out of Stock',
              duration: 3000
            });
            toast.present();
          }
        });
      }
      else {
        const toast = this.toastCtrl.create({
          message: 'Please select atleast 1 quantity',
          duration: 3000
        });
        toast.present();
      }
    }

    else {
      this.dismiss();
      // this.navCtrl.setRoot(FurnitureProductPage);
    }

  }

  minus() {
    if (this.counter > 1) {
      this.counter--;
    }
  }

  plus() {
    if (this.counter < this.CurrentProductQuantity) {
      this.counter++;
    }
    else {
      const toast = this.toastCtrl.create({
        message: 'Out of Stock',
        duration: 3000
      });
      toast.present();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FurnitureProductDescriptionPage');
  }

}
