import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FurnitureLoginPage } from "../furniture-login/furniture-login";
import { FurnitureSignUpPage } from "../furniture-sign-up/furniture-sign-up";

/**
 * Generated class for the FurnitureWelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-furniture-welcome',
  templateUrl: 'furniture-welcome.html',
})
export class FurnitureWelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FurnitureWelcomePage');
  }

  GoToSignUp(){
    this.navCtrl.push(FurnitureSignUpPage);
  }

  GoToSignIn(){
    this.navCtrl.push(FurnitureLoginPage);    
  }

}
