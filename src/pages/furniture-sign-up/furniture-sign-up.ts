import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FurnitureLoginPage } from '../furniture-login/furniture-login';
import { Device } from '@ionic-native/device';
import { GeneralProvider } from '../../providers/general/general';
/**
 * Generated class for the FurnitureSignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-furniture-sign-up',
  templateUrl: 'furniture-sign-up.html',
})
export class FurnitureSignUpPage {
  Logo: any;

  // Declear local variables
  public UserName = "";
  public Password = "";
  public Email = "";
  public Number = "";
  public gender = "";
  public agreement = false;
  // DeviceID = "0";
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, public toastCtrl: ToastController, private device: Device, private ObjGeneral: GeneralProvider) {
    // this.ObjGeneral.DeviceID = -1;
    // this.ObjGeneral.DeviceID = this.device.uuid;
    this.GetAllImages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FurnitureSignUpPage');
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

  Reset() {
    this.UserName = "";
    this.Password = "";
    this.Email = "";
    this.Number = "";
    this.gender = "";
    this.agreement = false;
  }
  IsSignedUp = false;

  Submit() {
    // if (this.UserName != "" && this.Password != "" && this.Email != "" && this.Number !== "" && this.gender != "" && this.agreement == true) {
    if (this.Password.length >= 8) {

      let A = this.Email.indexOf(".com")
      let B = this.Email.indexOf("@")

      // this.database.list("FurnitureDB/Users/" + this.UserName + " & " + this.Password).push({
      //   LogInID: this.UserName,
      //   LogInPassword: this.Password,
      //   Email: this.Email,
      //   Number: this.Number,
      //   Gender: this.gender,
      //   Agreement: this.agreement

      // });
      if (A < 0 || B < 0) {
        const toast = this.toastCtrl.create({
          message: 'Invalid Email address',
          duration: 3000
        });
        toast.present();
      }
      else {
        let User = this.UserName.toLowerCase() + " & " + this.Password;
        let UserName = this.UserName.toLowerCase();
        this.database.object('/FurnitureDB/Users/' + User).valueChanges().subscribe(data => {

          let SubArr = [];
          if (data != null)
            SubArr = Object.keys(data); //SubArr have all data inside signUp

          if (SubArr.length > 0) {
            if (!this.IsSignedUp) {
              const toast = this.toastCtrl.create({
                message: 'This username is already taken.',
                duration: 3000
              });
              toast.present();
            }
          }

          else {
            this.IsSignedUp = true;
            this.database.list("FurnitureDB/Users/" + UserName + " & " + this.Password).push({

              LogInID: UserName,

              LogInPassword: this.Password,

              Email: this.Email,

              Number: this.Number,

              Gender: this.gender,

              Agreement: this.agreement,

              isAdmin: 0
              // (this line Added in this method just )  
            }).then(() => {
              const toast = this.toastCtrl.create({
                message: 'SignedUp successful',
                duration: 3000
              });
              toast.present();
            });

            // this.database.list("FurnitureDB/WishList/" + this.UserName + " & " + this.Password).push({
            //   ProductID: ""
            // });

            this.Reset();
            this.navCtrl.push(FurnitureLoginPage)
          }

        })
      }

      // this.database.list("FurnitureDB/AddtoCart/" + this.UserName + " & " + this.Password).push({
      //   ProductID : ""       
      // });


      // this.database.list("FurnitureDB/AddtoCart/" + this.ObjGeneral.DeviceID).push({
      //   ProductID : ""       
      // });

      // }
      // else {
      //   const toast = this.toastCtrl.create({
      //     message: 'Fill the Feilds First',
      //     duration: 3000
      //   });
      //   toast.present();
      // }
    } else {
      const toast = this.toastCtrl.create({
        message: 'Atleast 8 Digit Password',
        duration: 3000
      });
      toast.present();
    }


  }

}
