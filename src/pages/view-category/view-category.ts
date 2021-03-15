import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AddCategoryPage } from '../add-category/add-category';

/**
 * Generated class for the ViewCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-view-category',
  templateUrl: 'view-category.html',
})
export class ViewCategoryPage {

  Categoryarray = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.ViewCategory()
  }

  ViewCategory() {
    
    this.database.object('FurnitureDB/Category').valueChanges().subscribe(data => {
      
      let SubArr = Object.keys(data);
      this.Categoryarray = [];
      for (var loop = 0; loop < SubArr.length; loop++) {
        const object2 = Object.assign({ CatID: SubArr[loop] }, data[SubArr[loop]]);
        this.Categoryarray.push(object2);
      }
    })
  }

  EditCategory(param){
    this.navCtrl.push(AddCategoryPage , { categoryID : param });    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewCategoryPage');
  }

}
