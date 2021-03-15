import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AddProductPage } from "../add-product/add-product";

/**
 * Generated class for the ViewProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-view-product',
  templateUrl: 'view-product.html',
})
export class ViewProductPage {

  ProductName = "";
  Category = "";
  Description = "";
  Quantity = "";
  IsActive = false;
  public Productarray = [];
  // public testarray = [];
  AllcatArray = [];
  CategoryFilter = "All"
  ProductArrayforSearch = [];
  IsSearching = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    //  this.testarray = [{name: "Arqam",age: "20"}, {name: "ibrahim",age: "30"}];
    let CatName = this.navParams.data.CatName;


    this.database.object('FurnitureDB/Product').valueChanges().subscribe(data => {
      let SubArr = Object.keys(data);
      this.Productarray = [];

      for (var loop = 0; loop < SubArr.length; loop++) {

        const object2 = Object.assign({ ID: SubArr[loop] }, data[SubArr[loop]]);
        this.Productarray.push(object2);
      }

      // For Data Entry
      // let SameCategoryProducts = this.Productarray.filter(items => items.Category == this.CategoryFilter);
      // this.ProductArrayforSearch = SameCategoryProducts;
      // this.IsSearching = true;
      

      if (CatName != undefined) {
        this.Productarray = this.Productarray.filter(items => items.Category == CatName)
      }
    })

    this.ViewCategory();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProductPage');
  }

  GototoProduct(param) {
    this.navCtrl.push(AddProductPage, { product: param });
  }

  onChangeFilter() {
    
    if (this.Productarray.length > 0) {
      let SameCategoryProducts = this.Productarray.filter(items => items.Category == this.CategoryFilter);
      if (SameCategoryProducts.length > 0 && this.CategoryFilter != "All") {
        this.ProductArrayforSearch = SameCategoryProducts;
        this.IsSearching = true;
      }
      else{
        this.IsSearching = false;
      }
    }
  }

  ViewCategory() {
    this.database.object('FurnitureDB/Category').valueChanges().subscribe(data => {
      let SubArr = Object.keys(data);
      this.AllcatArray = [];
      for (var loop = 0; loop < SubArr.length; loop++) {
        const object2 = Object.assign({ CatID: SubArr[loop] }, data[SubArr[loop]]);
        // if (loop < 2) {
          this.AllcatArray.push(object2);
        // }

        // this.AllcatArray.push(object2);
        // this.AllCat.push(object2);
        console.clear();
        console.log(this.AllcatArray[0].Name);

      }

      // this.GetAllProduct();

    })
  }

  Reset() {
    this.ProductName = "";
    this.Quantity = "";
    this.Category = "";
    this.Description = "";
    this.IsActive = false;
  }
}
