import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { StatusBar } from '@ionic-native/status-bar';

// import { Printer, PrintOptions } from '@ionic-native/printer/ngx';


import { MyApp } from './app.component';
import { FurnitureLoginPage } from '../pages/furniture-login/furniture-login';
import { FurnitureSignUpPage } from '../pages/furniture-sign-up/furniture-sign-up';
import { FurnitureCatViewPage } from '../pages/furniture-cat-view/furniture-cat-view';
import { FurnitureProductPage } from '../pages/furniture-product/furniture-product';
import { FurnitureProductDescriptionPage } from '../pages/furniture-product-description/furniture-product-description';
import { AddCategoryPage } from '../pages/add-category/add-category';
import { AddProductPage } from '../pages/add-product/add-product';
import { ViewProductPage } from '../pages/view-product/view-product';
import { ViewCategoryPage } from '../pages/view-category/view-category';
import { FurnitureWelcomePage } from '../pages/furniture-welcome/furniture-welcome';
import { FurnitureDashboardPage } from '../pages/furniture-dashboard/furniture-dashboard';
import { FurnitureAddtocartPage } from '../pages/furniture-addtocart/furniture-addtocart';
import { FurnitureBookorderPage } from '../pages/furniture-bookorder/furniture-bookorder';
import { FurnitureViewBookorderPage } from '../pages/furniture-view-bookorder/furniture-view-bookorder';
import { FurnitureBookOrderDetailPage } from '../pages/furniture-book-order-detail/furniture-book-order-detail';
import { FurnitureSidemenuCategoryPage } from '../pages/furniture-sidemenu-category/furniture-sidemenu-category';
import { ErrorPage } from '../pages/error/error';
import { NetworkErrorPage } from '../pages/network-error/network-error';
import { LoginPage } from '../pages/login/login';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { GeneralProvider } from '../providers/general/general';
import { FilterPipe } from '../pipes/filter/filter';
import { Device } from '@ionic-native/device';
import { SideMenuContentComponent } from '../shared/side-menu-content/side-menu-content.component';
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';
import { Printer } from '@ionic-native/printer';
import { PhotoViewer } from '@ionic-native/photo-viewer';


// import { WishlistPage } from '../pages/wishlist/wishlist';
import { ViewWishlistPage } from '../pages/view-wishlist/view-wishlist';
import { NoConnectionPage } from '../pages/no-connection/no-connection';
import { ViewOrderDetailPage } from '../pages/view-order-detail/view-order-detail';
import { FurnitureInvoicePage } from '../pages/furniture-invoice/furniture-invoice';
import { AddToCartPage } from '../pages/add-to-cart/add-to-cart';
import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { MyWishListPage } from '../pages/wish-list/wish-list';
import { MainHomePage } from '../pages/home/home';
import { WishlistPage2 } from '../pages/wishlist/wishlist';
import { AddSliderPage } from '../pages/add-slider/add-slider';
import { ViewSliderPage } from '../pages/view-slider/view-slider';
import { FurniturePhotoSliderModalPage } from '../pages/furniture-photo-slider-modal/furniture-photo-slider-modal';
// import {  FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

const firebase = {
  // apiKey: "AIzaSyDBJDCOJ_nZYGneit9pNEhRSehW0x9SFfc",
  // authDomain: "furnitureapp-b16c5.firebaseapp.com",
  // databaseURL: "https://furnitureapp-b16c5.firebaseio.com",
  // projectId: "furnitureapp-b16c5",
  // storageBucket: "furnitureapp-b16c5.appspot.com",
  // messagingSenderId: "472192445863"

  // apiKey: "AIzaSyAmUJRWGz839xIJsdfagq4AzkNyjqGALhY",
  // authDomain: "getstationery-1d26e.firebaseapp.com",
  // databaseURL: "https://getstationery-1d26e.firebaseio.com",
  // projectId: "getstationery-1d26e",
  // storageBucket: "getstationery-1d26e.appspot.com",
  // messagingSenderId: "583885238879",
  // appId: "1:583885238879:web:2fe24dc79c1da5d97d21ea",
  // measurementId: "G-VJ934JVSFN"


  // SkylineProgrammer@gmail.com && GETBASKET
  // apiKey: "AIzaSyCpbCUqfY5rdJWtQ0A-yingpNNzL6HCRZQ",
  // authDomain: "getbasket-26ec2.firebaseapp.com",
  // databaseURL: "https://getbasket-26ec2.firebaseio.com",
  // projectId: "getbasket-26ec2",
  // storageBucket: "getbasket-26ec2.appspot.com",
  // messagingSenderId: "451516304542",
  // appId: "1:451516304542:web:0f74f9010d76e9274fbf8f"

  // ahmed133ibtesam@gmail.com && PROPER PROP
  //     apiKey: "AIzaSyChTkLiAisHC1QrusSZzOL4yCq_Kfxqduc",
  //     authDomain: "furniture-app-f5a52.firebaseapp.com",
  //     databaseURL: "https://furniture-app-f5a52.firebaseio.com",
  //     projectId: "furniture-app-f5a52",
  //     storageBucket: "furniture-app-f5a52.appspot.com",
  //     messagingSenderId: "989094361852",
  //     appId: "1:989094361852:web:4c02bb35ca6a6bf5ddf579"

  // };

  // Live URL of PROPER PROP
  apiKey: "AIzaSyACNPJPZ_vIaygkHoDt2dK3orHO1MvyVc0",
  authDomain: "proper-prop.firebaseapp.com",
  databaseURL: "https://proper-prop.firebaseio.com",
  projectId: "proper-prop",
  storageBucket: "proper-prop.appspot.com",
  messagingSenderId: "681155690859",
  appId: "1:681155690859:web:57935ec6e7bebc5a2d4c2e",
  measurementId: "G-71MF72NN8D"
};


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    FurnitureLoginPage,
    FurnitureSignUpPage,
    FurnitureCatViewPage,
    FurnitureProductPage,
    FurnitureProductDescriptionPage,
    AddCategoryPage,
    AddProductPage,
    ViewCategoryPage,
    ViewProductPage,
    FurnitureDashboardPage,
    FurnitureAddtocartPage,
    FurnitureBookorderPage,
    FurnitureViewBookorderPage,
    FurnitureBookOrderDetailPage,
    FurnitureWelcomePage,
    FurnitureSidemenuCategoryPage,
    FilterPipe,
    SideMenuContentComponent,
    ViewWishlistPage,
    NoConnectionPage,
    ViewOrderDetailPage,
    FurnitureInvoicePage,
    MyWishListPage,
    AddToCartPage,
    MyOrdersPage,
    MainHomePage,
    ErrorPage,
    WishlistPage2,
    AddSliderPage,
    ViewSliderPage,
    NetworkErrorPage,
    FurniturePhotoSliderModalPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false,
    }),
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    FurnitureLoginPage,
    FurnitureSignUpPage,
    FurnitureCatViewPage,
    FurnitureProductPage,
    FurnitureProductDescriptionPage,
    AddCategoryPage,
    AddProductPage,
    ViewCategoryPage,
    ViewProductPage,
    FurnitureDashboardPage,
    FurnitureAddtocartPage,
    FurnitureBookorderPage,
    FurnitureViewBookorderPage,
    FurnitureBookOrderDetailPage,
    FurnitureWelcomePage,
    FurnitureSidemenuCategoryPage,
    ViewWishlistPage,
    NoConnectionPage,
    ViewOrderDetailPage,
    FurnitureInvoicePage,
    MyWishListPage,
    AddToCartPage,
    MyOrdersPage,
    MainHomePage,
    ErrorPage,
    WishlistPage2,
    AddSliderPage,
    ViewSliderPage,
    NetworkErrorPage,
    FurniturePhotoSliderModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GeneralProvider,
    Device,
    Network,
    NetworkProvider,
    Printer,
    SocialSharing,
    PhotoViewer
  ]
})
export class AppModule { }
