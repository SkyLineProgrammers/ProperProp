import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the FurniturePhotoSliderModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-furniture-photo-slider-modal',
  templateUrl: 'furniture-photo-slider-modal.html',
})
export class FurniturePhotoSliderModalPage {

  // "https://static.onecms.io/wp-content/uploads/sites/35/2016/05/16190939/forest-mountains.jpg",
  //   "http://lh3.googleusercontent.com/cl5E9fmP1iwo8Tq0wBnc7I42DvABMPv0sSChvE_GT2tFlCHkprCb91mm0iAjKIcWATM_6Zb0u1oGd8yhV_CGNIE=s0",
  //   "http://enlight-app.appspot.com.storage.googleapis.com/2015-07-08T19-01-04-dpc_photography_.jpg"
  SlideArray = [

  ];

  goToClose() {
    this.navCtrl.pop();
  }

  constructor(public navCtrl: NavController, private socialSharing: SocialSharing, public navParams: NavParams) {
    this.SlideArray.push(this.navParams.get('img1'));
    this.SlideArray.push(this.navParams.get('img2'));
    this.SlideArray.push(this.navParams.get('img3'));
  }


  share(param) {
    this.socialSharing.share(this.SlideArray[0], "", "", "").then(data => {
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FurniturePhotoSliderModalPage');
  }

}
