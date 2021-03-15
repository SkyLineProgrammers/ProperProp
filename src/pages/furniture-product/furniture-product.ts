import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { FurnitureCatViewPage } from '../furniture-cat-view/furniture-cat-view';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import { FurnitureProductDescriptionPage } from '../furniture-product-description/furniture-product-description';
import { FurnitureProductDescriptionPage } from '../furniture-product-description/furniture-product-description';
import firebase from 'firebase';
import { FurnitureAddtocartPage } from '../furniture-addtocart/furniture-addtocart';
import { FurnitureSidemenuCategoryPage } from '../furniture-sidemenu-category/furniture-sidemenu-category';
import { GeneralProvider } from '../../providers/general/general';
import { ErrorPage } from '../error/error';
import { LoadingController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

// import TypeIt from 'typeit';
/**
 * Generated class for the FurnitureProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-furniture-product',
  templateUrl: 'furniture-product.html',
})
export class FurnitureProductPage {
  SliderArray: any[];
  TempProductArrayLeft = [];
  TempProductArrayRight = [];
  public CategoryID = "";
  public CategoryImage = "";
  AllcatArray = [];
  WishListArray = [];
  SliderImageOne: any;
  SliderImageTwo: any;
  SliderImageThree: any;

  public countryList: Array<any>;
  public loadedCountryList: Array<any>;
  public countryRef: firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private database: AngularFireDatabase, private ObjGeneralHelper: GeneralProvider, public toastCtrl: ToastController, public loadingCtrl: LoadingController, private socialSharing: SocialSharing) {
    var catId = this.navParams.get('categoryID');
    this.CategoryImage = this.navParams.get('categoryImage');
    this.CategoryID = catId;
    this.presentLoading();
    this.GetAllImages();
    this.ViewCategory();
    this.GetAllWishList();
    // alert(this.CategoryID);

    this.countryRef = firebase.database().ref('/Product');
    // if(catId == 1){
    //   this.TemporarayItemArray1()
    // }
    // else if(catId == 2){
    //   this.TemporarayItemArray2()
    // }
    // else if(catId == 3){
    //   this.TemporarayItemArray3()
    // }
    // else if(catId == 4){
    //   this.TemporarayItemArray4()
    // }
    // else if(catId == 5){
    //   this.TemporarayItemArray5()
    // }
    // else if(catId == 6){
    //   this.TemporarayItemArray6()
    // }

    // this.countryRef.on('value', countryList => {
    //   let countries = [];
    //   countryList.forEach( country => {
    //     countries.push(country.val());
    //     return false;
    //   });

    //   this.countryList = countries;
    //   this.loadedCountryList = countries;
    // });
  }



  ionViewWillEnter() {
    if (this.ObjGeneralHelper.WishListIDs.length > 0) {
      // if (this.ObjGeneralHelper.IsRemoved) {
      for (let i = 0; i < this.ObjGeneralHelper.WishListIDs.length; i++) {
        let Value = this.TempProductArrayLeft.find(items => items.ID == this.ObjGeneralHelper.WishListIDs[i].ProductID)
        if (Value != undefined) {
          let index = this.TempProductArrayLeft.indexOf(Value);
          this.TempProductArrayLeft[index].isWishList = 0;
          this.TempProductArrayLeft[index].WishListID = this.ObjGeneralHelper.WishListIDs[i].WishlistID;
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

  initializeItems(): void {
    this.countryList = this.loadedCountryList;
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 5000
    });
    loader.present();
  }

  GetAllImages() {
    this.database.object('FurnitureDB/CustomImages').valueChanges().subscribe(data => {
      if (data != null) {
        let SubArr = Object.keys(data);
        this.ObjGeneralHelper.CustomImages = [];
        for (var loop = 0; loop < SubArr.length; loop++) {
          const object2 = Object.assign({ ID: SubArr[loop] }, data[SubArr[loop]]);
          if (object2.ApplicationCheck == "1") {
            this.navCtrl.setRoot(ErrorPage);
          } else {
            this.SliderImageOne = object2.HomeSliderOne
            this.SliderImageTwo = object2.HomeSliderTwo
            this.SliderImageThree = object2.HomeSliderThree
          }
        }
      }
    })
  }

  AllCat = [];
  myInput = "";
  presentModal(param, _CatID) {
    if (_CatID != undefined)
      this.CategoryID = _CatID
    else if (_CatID == undefined)
      this.CategoryID = param.Category;
    // alert(_CatID)
    const modal = this.modalCtrl.create(FurnitureProductDescriptionPage, { ProductInfo: param, CategoryName: _CatID });
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

            document.getElementById(param.ID + "0").style.display = "block";
            document.getElementById(param.ID + "1").style.display = "none";

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

  SliderImages() {
    var sk = this.ObjGeneralHelper.CustomImages;
    this.SliderImageOne = sk[0].HomeSliderOne
    this.SliderImageTwo = sk[0].HomeSliderTwo
    this.SliderImageThree = sk[0].HomeSliderThree
    if (sk[0].ApplicationCheck == 1) {
      this.navCtrl.setRoot(ErrorPage);
    }

  }

  BtnShareClick() {
    this.socialSharing.share("This is Furniture Demo Share", "Furniture Sharing", "", "https://www.google.com").then(() => {

    })
  }

  BtnSeeAllClick(CategoryArray) {

    this.navCtrl.push(FurnitureSidemenuCategoryPage, { CatName: CategoryArray })
  }

  Extra() {
    this.database.list("/FurnitureDB/CustomImages").push({
      Logo: '',
      WhiteLogo: '',
      HomeSliderOne: '',
      HomeSliderTwo: '',
      HomeSliderThree: '',
      CategoryBanner: '',
    });
  }

  ShareApp() {

  }

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
      this.ObjGeneralHelper.IsAdded = true;
      // if (this.ObjGeneralHelper.ProductIDs.length > 0) {
      let Find = this.ObjGeneralHelper.ProductIDs.find(items => items == _ProductID)
      if (Find == undefined || Find == null)
        this.ObjGeneralHelper.ProductIDs.push(_ProductID);
      // }

      // const toast = this.toastCtrl.create({
      //   message: 'Added to wishlist',
      //   duration: 3000
      // });
      // toast.present();
    });
  }

  ViewCategory() {
    this.database.object('FurnitureDB/Category').valueChanges().subscribe(data => {
      let SubArr = Object.keys(data);
      this.AllcatArray = [];
      this.AllCat = [];
      for (var loop = 0; loop < SubArr.length; loop++) {
        const object2 = Object.assign({ CatID: SubArr[loop] }, data[SubArr[loop]]);
        // if (loop < 2) {
        //   this.AllcatArray.push(object2);
        // } else {
        this.AllCat.push(object2);
        // }

        // this.AllcatArray.push(object2);
        // this.AllCat.push(object2);

      }

      this.GetAllProduct();

    })
  }

  gotoAddtoCart() {
    this.navCtrl.push(FurnitureAddtocartPage)
  }

  SelectSearch(index) {
    this.myInput = this.countryList[index].ProductName;
  }

  IsReadyToSearch = false;
  onInput(event) {
    // Reset items back to all of the items
    // this.initializeItems();
    this.IsReadyToSearch = true;
    // set q to the value of the searchbar
    var q = event.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      this.countryList = this.TempProductArrayLeft
      this.IsReadyToSearch = false;
      return;
    }

    this.TempProductArrayLeft.filter((v) => {

    });

    this.countryList = this.TempProductArrayLeft.filter((v) => {

      if (v.ProductName && q) {
        // this.AllCat;
        // console.log(v.Category);
        // console.log(this.AllCat.find(data => data.CategoryName == v.Category).isActive);
        if (v.ProductName.toLowerCase().indexOf(q.toLowerCase()) > -1 && v.IsActive == true) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.countryList.length);
  }

  onCancelInput(event) {

    console.log(event);
    this.IsReadyToSearch = false;
    this.countryList = this.TempProductArrayLeft;
  }

  testSK(param) {
    var val = param.srcElement.value;
    var res = this.AllCat.findIndex(x => x.CategoryName == val);
    if (res != -1) {

      this.navCtrl.push(FurnitureSidemenuCategoryPage, { CatName: val })
    }
  }

  FirstRowProduct = [];
  SecondRowProduct = [];
  ThirdRowProduct = [];
  FourthRowProduct = [];


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

  GetAllProduct() {
    this.database.object('FurnitureDB/Product').valueChanges().subscribe(data => {
      let SubArr = Object.keys(data);
      this.TempProductArrayLeft = [];
      for (var loop = 0; loop < SubArr.length; loop++) {

        let isWishList = 0;
        let WishListId = -1;
        this.WishListArray.forEach(element => {
          if (element.ProductID == SubArr[loop]) {

            isWishList = 1;
            WishListId = element.ManualWishListKey;
          }
        });
        // if (this.CategoryID == data[SubArr[loop]].Category) {
        const object2 = Object.assign({ ID: SubArr[loop] }, { isWishList: isWishList }, { WishListID: WishListId }, data[SubArr[loop]]);
        // if (loop % 2 == 0) {
        this.TempProductArrayLeft.push(object2);
        // }
        // else {
        //   this.TempProductArrayRight.push(object2)
        // }
        // }

      }

      // this.countryList = this.TempProductArrayLeft;
      // if (this.AllcatArray.length >= 2) {
      //   this.AllcatArray.length = 2;
      //   if (this.TempProductArrayLeft.length > 0) {

      //     this.FirstRowProduct = this.TempProductArrayLeft.filter(items => items.Category == this.AllcatArray[0].CategoryName);
      //     this.SecondRowProduct = this.TempProductArrayLeft.filter(items => items.Category == this.AllcatArray[1].CategoryName);
      //     if (this.FirstRowProduct.length > 11)
      //       this.FirstRowProduct.length = 11;
      //     if (this.SecondRowProduct.length > 11)
      //       this.SecondRowProduct.length = 11;

      // this.FirstRowProduct.push(this.FirstRowProduct);
      // this.FirstRowProduct = this.TempProductArrayLeft;
      // for (let index = 0; index < this.TempProductArrayLeft.length; index++) {
      //   
      //   this.FirstRowProduct.push(this.TempProductArrayLeft[index]);
      // }
      // if(this.FirstRowProduct.length > 6)
      // {
      //   let N = this.FirstRowProduct.length;
      //   for(let i = N; i <= this.FirstRowProduct.length; i++)
      //   {
      //     this.SecondRowProduct.push(this.FirstRowProduct[i]);

      //   }
      //   for (let i = 0; i < this.FirstRowProduct.length; i++) {
      //     this.FirstRowProduct.splice(i,1);
      //   }
      // }

      // this.SecondRowProduct = this.TempProductArrayLeft.filter(items => items.Category == this.AllcatArray[1].CategoryName);
      // this.ThirdRowProduct = this.TempProductArrayLeft.filter(items => items.Category == this.AllcatArray[])
      // }
      // }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FurnitureProductPage');
  }

}
