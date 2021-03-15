import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FurnitureSignUpPage } from '../furniture-sign-up/furniture-sign-up';
import { FurnitureCatViewPage } from '../furniture-cat-view/furniture-cat-view';
import { GeneralProvider } from '../../providers/general/general';
import { FurnitureDashboardPage } from '../furniture-dashboard/furniture-dashboard';
import { FurnitureProductPage } from '../furniture-product/furniture-product';
import { FurnitureAddtocartPage } from '../furniture-addtocart/furniture-addtocart';
import { FurnitureViewBookorderPage } from '../furniture-view-bookorder/furniture-view-bookorder';
import { MainHomePage } from "../home/home";
import { ModalController } from 'ionic-angular';
import { FurniturePhotoSliderModalPage } from '../furniture-photo-slider-modal/furniture-photo-slider-modal';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-furniture-login',
  templateUrl: 'furniture-login.html',
})
export class FurnitureLoginPage {
  link: any;
  file: any;
  sub: any;
  msg = "Hello";


  public UserName = "";
  public Password = "";
  public LogerInfo = [];
  Logo: any;
  constructor(public navCtrl: NavController, private socialSharing: SocialSharing, public navParams: NavParams, private fire: AngularFireAuth, private database: AngularFireDatabase, private ObjGeneral: GeneralProvider, public toastCtrl: ToastController, public modalCtrl: ModalController) {
    this.GetAllImages();
    let aq = this.ObjGeneral.DeviceID;

  }

  share() {
    this.socialSharing.share(this.Logo, this.sub, this.file, this.link).then(data => {
    })
  }

  GetAllImages() {
    // this.database.object('FurnitureDB/CustomImages').valueChanges().subscribe(data => {
    //   if (data != null) {
    //     let SubArr = Object.keys(data);
    //     let object2 : any;
    //     for (var loop = 0; loop < SubArr.length; loop++) {
    //       object2 = Object.assign({ ID: SubArr[loop] }, data[SubArr[loop]]);
    //     }
    this.Logo = "assets/imgs/ColorLogo.png"

    //   }
    // })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
  }



  // LogIn() {

  // } a rhi 

  // LogIn() {
  //   let UserPass = this.UserName + " & " + this.Password;

  //   var Sucess;
  //   if (this.UserName != "" && this.Password != "") {
  //     this.database.object('/FurnitureDB/Users/').valueChanges().subscribe(data => {
  //       let FirstArr = Object.keys(data);   //FirstArr have All username
  //       for (var i = 0; i < FirstArr.length; i++) {
  //         if (UserPass == FirstArr[i]) {
  //           this.database.object('/FurnitureDB/Users/' + UserPass).valueChanges().subscribe(data => {
  //             let SubArr = Object.keys(data); //SubArr have all data inside signUp
  //             this.LogerInfo = data[SubArr[0]];
  //             this.ObjGeneral.setUserInfo(this.LogerInfo);
  //             this.ObjGeneral.setUserName(UserPass);
  //             var test = this.ObjGeneral.UserName;
  //             this.navCtrl.push(FurnitureDashboardPage);
  //           }) 
  //         }
  //       }
  //     })
  //   }
  // }


  SaveLogerInformation(param, UserPass) {
    var Obj = Object.assign({ UserPass: UserPass }, param);
    this.database.list("FurnitureDB/OneTimeLogin/" + this.ObjGeneral.DeviceID + "/").push(Obj)
  }

  ModalTesting() {
    const modal = this.modalCtrl.create(FurniturePhotoSliderModalPage);
    modal.present();
  }

  LogIn() {

    let UserPass = this.UserName.toLowerCase() + " & " + this.Password;

    var Sucess;
    var Count = 0;
    if (this.UserName != "" && this.Password != "") {

      this.database.object('/FurnitureDB/Users/').valueChanges().subscribe(data => {
        let FirstArr = Object.keys(data);
        //FirstArr have All username

        for (var i = 0; i < FirstArr.length; i++) {
          Count++;
          if (UserPass == FirstArr[i]) {
            Count = 0;
            this.database.object('/FurnitureDB/Users/' + UserPass).valueChanges().subscribe(data => {

              let SubArr = Object.keys(data); //SubArr have all data inside signUp
              this.ObjGeneral.IsLoggedID = true;
              this.LogerInfo = Object.assign({ Key: SubArr[0] }, data[SubArr[0]]);
              this.ObjGeneral.setUserInfo(this.LogerInfo);
              this.ObjGeneral.setUserName(UserPass);
              this.SaveLogerInformation(this.LogerInfo, UserPass);


              if (data[SubArr[0]].isAdmin == 1) {

                // this.navCtrl.push(FurnitureDashboardPage);
                this.ObjGeneral.IsAdmin = true;
                this.navCtrl.setRoot(FurnitureDashboardPage);

              }

              else if (this.ObjGeneral.IsMovetoCart) {
                this.ObjGeneral.IsMovetoCart = false;
                this.navCtrl.push(MainHomePage, { pageType: 'cart' })
                // this.navCtrl.push(FurnitureAddtocartPage);
                // this.navCtrl.setRoot(MainHomePage , { pageType : 'cart' });

              }

              else if (this.ObjGeneral.IsMovetoOrders) {
                this.ObjGeneral.IsMovetoOrders = false;
                // this.navCtrl.push(FurnitureViewBookorderPage);
                this.navCtrl.push(MainHomePage)
              }

              else {
                this.ObjGeneral.IsAdmin = false;
                this.navCtrl.push(MainHomePage, { pageType: 'Main' })
              }

            })

          }
          else if (Count == FirstArr.length) {
            const toast = this.toastCtrl.create({
              message: 'Invalid Username or password',
              duration: 3000
            });
            toast.present();
          }

        }

      })

    }

  }

  SignUp() {
    this.navCtrl.push(FurnitureSignUpPage);
  }
}