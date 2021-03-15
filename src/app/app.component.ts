import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FurnitureCatViewPage } from '../pages/furniture-cat-view/furniture-cat-view';
import { FurnitureLoginPage } from '../pages/furniture-login/furniture-login';
import { FurnitureSignUpPage } from '../pages/furniture-sign-up/furniture-sign-up';
import { FurnitureWelcomePage } from '../pages/furniture-welcome/furniture-welcome';

import { LoginPage } from '../pages/login/login';
import { AddProductPage } from '../pages/add-product/add-product';
import { AddCategoryPage } from '../pages/add-category/add-category';
import { ViewCategoryPage } from '../pages/view-category/view-category';
import { ViewProductPage } from '../pages/view-product/view-product';
import { FurnitureViewBookorderPage } from '../pages/furniture-view-bookorder/furniture-view-bookorder';
import { FurnitureDashboardPage } from '../pages/furniture-dashboard/furniture-dashboard';
import { AngularFireDatabase } from 'angularfire2/database';
import { GeneralProvider } from '../providers/general/general';
import { Device } from '@ionic-native/device';
import { FurnitureProductPage } from "../pages/furniture-product/furniture-product";
import { FurnitureSidemenuCategoryPage } from "../pages/furniture-sidemenu-category/furniture-sidemenu-category";
import { FurnitureBookorderPage } from '../pages/furniture-bookorder/furniture-bookorder';
import { FurnitureAddtocartPage } from '../pages/furniture-addtocart/furniture-addtocart';
import { Network } from '@ionic-native/network';
import { SideMenuSettings } from '../shared/side-menu-content/models/side-menu-settings';
import { MenuOptionModel } from './../shared/side-menu-content/models/menu-option-model';
import { NetworkProvider } from '../providers/network/network';
import { ViewWishlistPage } from '../pages/view-wishlist/view-wishlist';
import { MainHomePage } from '../pages/home/home';
import { ErrorPage } from '../pages/error/error';
import { NetworkErrorPage } from '../pages/network-error/network-error';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav

  // rootPage: any = FurnitureLoginPage;
  rootPage: any;

  // rootPage: any ;
  // rootPage: any = ViewProductPage;

  pages: Array<{ title: string, component: any, icon: string }>


  // Selected Side Menu
  selectedMenu: any;
  Categoryarray;
  public options: Array<MenuOptionModel>;

  public sideMenuSettings: SideMenuSettings = {
    accordionMode: true,
    showSelectedOption: true,
    selectedOptionClass: 'my-selected-option',
    subOptionIndentation: {
      md: '56px',
      ios: '64px',
      wp: '56px'
    }
  };

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private database: AngularFireDatabase, private ObjGeneralHelper: GeneralProvider, private device: Device, public menuCtrl: MenuController, public events: Events,
    public network: Network,
    public networkProvider: NetworkProvider) {
    // splashScreen.hide();
    // this.rootPage = AddProductPage

    // this.GetAllSliderImages();
    // this.GetAllImages();
    platform.ready().then(() => {
      // alert("Inside ready")
      this.rootPage = MainHomePage;
      splashScreen.hide();

      this.networkProvider.initializeNetworkEvents();
      var storageID = "";
      let ID: string = new Date().getTime().toString();
      storageID = "PR-" + ID.substring(ID.length - 6);
      var chk = localStorage.getItem('userDeviceID');
      if (chk == null) {
        localStorage.setItem("userDeviceID", storageID);
        this.ObjGeneralHelper.DeviceID = storageID;
      } else {
        this.ObjGeneralHelper.DeviceID = chk;
      }

      // alert(this.ObjGeneralHelper.DeviceID);
      // alert(this.ObjGeneralHelper.DeviceID);
      if (this.ObjGeneralHelper.DeviceID == null) {
        this.ObjGeneralHelper.DeviceID = "TestingSK"
      }
      // if (this.OneTimeLogin(this.ObjGeneralHelper.DeviceID)) {

      // }
      // Offline event
      this.events.subscribe('network:offline', () => {
        // alert('network:offline ==> ' + this.network.type);
      });
      // alert(this.network.type);
      // if(this.network.type == "none" || this.network.type == "unknown" || this.network.type == "null"){
      //   this.rootPage = NetworkErrorPage ;
      // }else {
      // this.rootPage = MainHomePage;        
      // }
      // Online event
      this.events.subscribe('network:online', () => {
        // alert('network:online ==> ' + this.network.type);
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
    });
    this.pages = [
      { title: 'Add Category', component: AddCategoryPage, icon: "add-circle" },
      { title: 'View Category', component: ViewCategoryPage, icon: "eye" },
      { title: 'Add Product', component: AddProductPage, icon: "add-circle" },
      { title: 'View Product', component: ViewProductPage, icon: "eye" },
      { title: 'View Orders', component: FurnitureViewBookorderPage, icon: "eye" },
      // { title: 'Add Category', component: AddCategoryPage ,icon:"add"},
      // { title: 'Add Category', component: AddCategoryPage ,icon:"add"},


    ];

    this.GetAllAddtoCart();
    console.log(this.pages)
    this.ViewCategory();
  }

  OneTimeLogin(param) {
    this.database.object('FurnitureDB/OneTimeLogin').valueChanges().subscribe(data => {
      if (data != null) {
        let SubArr = Object.keys(data);
        for (var loop = 0; loop < SubArr.length; loop++) {
          let SubArr2: any;
          SubArr2 = Object.keys(data[SubArr[loop]]);
          const object2 = Object.assign({ OneTimeLoginID: SubArr[loop] }, { UserKey: SubArr2[0] }, data[SubArr[loop]][SubArr2]);
          if (object2.OneTimeLoginID == param) {
            this.ObjGeneralHelper.setUserInfo(object2);
            this.ObjGeneralHelper.IsAdmin = object2.isAdmin;
            this.ObjGeneralHelper.IsLoggedID = true;
          }
        }
      }
    })
  }

  GetAllSliderImages() {
    this.database.object('FurnitureDB/SliderImages').valueChanges().subscribe(data => {
      if (data != undefined) {
        let SubArr = Object.keys(data);
        this.ObjGeneralHelper.AppSliders = [];
        for (var loop = 0; loop < SubArr.length; loop++) {
          const object2 = Object.assign({ SliderID: SubArr[loop] }, data[SubArr[loop]]);
          this.ObjGeneralHelper.AppSliders.push(object2);
        }
      }
    })
  }

  Logout() {
    this.database.list('/FurnitureDB/OneTimeLogin/').remove(this.ObjGeneralHelper.DeviceID);
    this.menuCtrl.close();
    this.ObjGeneralHelper.IsLoggedID = false;
    this.ObjGeneralHelper.IsAdmin = false;
    this.ObjGeneralHelper.UserInfo = [];
  }

  GotoWishListPage() {
    this.menuCtrl.close();
    this.nav.push(ViewWishlistPage)
  }

  GotoOrderPage() {
    if (this.ObjGeneralHelper.IsLoggedID)
      this.nav.push(FurnitureViewBookorderPage);
    else {
      this.ObjGeneralHelper.IsMovetoOrders = true;
      this.nav.push(FurnitureLoginPage);
    }

    this.menuCtrl.close();
  }

  GotoCartPage() {
    this.nav.push(FurnitureAddtocartPage)
    this.menuCtrl.close();
  }

  GotoDashBoard() {
    this.menuCtrl.close();
    this.nav.setRoot(FurnitureDashboardPage);
  }

  ShoworHideItems() {
    let Show = document.getElementById("Items");
    if (Show.style.display == "none") {
      Show.style.display = "block";
    }
    else {
      Show.style.display = "none";
    }
  }

  ViewCategory() {

    this.database.object('FurnitureDB/Category').valueChanges().subscribe(data => {

      let SubArr = Object.keys(data);
      this.Categoryarray = [];
      for (var loop = 0; loop < SubArr.length; loop++) {
        const object2 = Object.assign({ CatID: SubArr[loop] }, data[SubArr[loop]]);
        this.Categoryarray.push(object2);
      }
      // if (this.Categoryarray.length > 15)
      //   this.Categoryarray.length = 15;
    })
  }

  SignIn() {
    this.menuCtrl.close();
    // this.ObjGeneralHelper.IsMovetoCart = true;
    this.nav.push(FurnitureLoginPage)
  }

  SignUp() {
    this.menuCtrl.close();
    this.nav.push(FurnitureSignUpPage)
  }
  // AddtoCart = [];
  GetAllAddtoCart() {
    // this.database.object('FurnitureDB/AddtoCart/' + this.ObjGeneralHelper.DeviceID).valueChanges().subscribe(data => {
    //   if (data == null) {
    //     this.database.list("FurnitureDB/AddtoCart/" + this.ObjGeneralHelper.DeviceID).push({
    //       ProductID: ""
    //     });
    //   }
    // })
  }

  openPage(p) {
    this.nav.push(FurnitureSidemenuCategoryPage, { CatName: p.CategoryName })
    this.menuCtrl.close();
  }

  GetAllImages() {
    this.database.object('FurnitureDB/CustomImages').valueChanges().subscribe(data => {
      if (data != null) {
        let SubArr = Object.keys(data);
        this.ObjGeneralHelper.CustomImages = [];
        for (var loop = 0; loop < SubArr.length; loop++) {
          const object2 = Object.assign({ ID: SubArr[loop] }, data[SubArr[loop]]);
          this.ObjGeneralHelper.CustomImages.push(object2);
        }
        console.clear();
        console.log(this.ObjGeneralHelper.CustomImages);
      }
    })
  }

  // openPage(page, index) {
  //   
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   if (page.component) {
  //     this.nav.setRoot(page.component);
  //     this.menuCtrl.close();
  //   } else {
  //     if (this.selectedMenu) {
  //       this.selectedMenu = 0;
  //     } else {
  //       this.selectedMenu = index;
  //     }
  //   }
  // }
}

