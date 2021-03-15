import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { FurnitureProductPage } from '../furniture-product/furniture-product';
import { AddProductPage } from '../add-product/add-product';
import { ViewProductPage } from '../view-product/view-product';
import { AddCategoryPage } from '../add-category/add-category';
import { ViewCategoryPage } from '../view-category/view-category';
import { FurnitureCatViewPage } from '../furniture-cat-view/furniture-cat-view';
import { FurnitureViewBookorderPage } from "../furniture-view-bookorder/furniture-view-bookorder";
import { Chart } from 'chart.js';
import { AngularFireDatabase } from 'angularfire2/database';
import { MainHomePage } from "../home/home";
import { GeneralProvider } from "../../providers/general/general";
import { AddSliderPage } from '../add-slider/add-slider';
import { ViewSliderPage } from '../view-slider/view-slider';

/**
 * Generated class for the FurnitureDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-furniture-dashboard',
  templateUrl: 'furniture-dashboard.html',
})
export class FurnitureDashboardPage {
  Logo: any;

  // @ViewChild(Slides) slides: Slides;

  myInput;
  DashboardDesign = "Graph";
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase,  public ObjGeneral: GeneralProvider) {
    this.GetAllImages();

    // setTimeout(() => { 
    //   this.GraphData();
    //  }, 5000);

  }

  GetAllImages() {
    this.database.object('FurnitureDB/CustomImages').valueChanges().subscribe(data => {
      if (data != null) {
        let SubArr = Object.keys(data);
        let object2 : any;
        for (var loop = 0; loop < SubArr.length; loop++) {
          object2 = Object.assign({ ID: SubArr[loop] }, data[SubArr[loop]]);
        }
        this.Logo = object2.Logo
        
      }
    })
  }

  // GraphData() {
  //   this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

  //     type: 'doughnut',
  //     data: {
  //       labels: ["Booked Order", "Confirm Order", "Deliver Order", "Complete Order", "Cancle Order"],
  //       datasets: [{
  //         data: [12, 19, 3, 5, 2],
  //         backgroundColor: [
  //           '#6666ff',
  //           '#ADFF2F',
  //           '#ffff00',
  //           '#D2B48C',
  //           '#ff0000',
  //         ],
  //         hoverBackgroundColor: [
  //           "#b2b2ff",
  //           "#90EE90",
  //           "#ffffb2",
  //           "#FFF8DC",
  //           "#ff7f7f",
  //         ]
  //       }]
  //     }

  //   });

  // }
  isCencleCount = 0;
  isBookedCount = 0;
  isConfirmCount = 0;
  isDeliverCount = 0;
  isCompleteCount = 0;
  GraphData() {



    this.database.object('FurnitureDB/Orders').valueChanges().subscribe(data => {

      let SubArr = Object.keys(data);

      for (var loop = 0; loop < SubArr.length; loop++) {

        var Status = "";

        if (data[SubArr[loop]].IsCencle == 1) {

          this.isCencleCount++;

        }

        else if (data[SubArr[loop]].IsCencle == 0 && data[SubArr[loop]].isBooked == 0 && data[SubArr[loop]].IsDeliver == 0 && data[SubArr[loop]].Return == 0) {

          this.isBookedCount++;

        }

        else if (data[SubArr[loop]].IsCencle == 0 && data[SubArr[loop]].isBooked == 1 && data[SubArr[loop]].IsDeliver == 0 && data[SubArr[loop]].Return == 0) {

          this.isConfirmCount++

        }

        else if (data[SubArr[loop]].IsCencle == 0 && data[SubArr[loop]].isBooked == 1 && data[SubArr[loop]].IsDeliver == 1 && data[SubArr[loop]].Return == 0) {

          this.isDeliverCount++

        }

        else if (data[SubArr[loop]].IsCencle == 0 && data[SubArr[loop]].isBooked == 1 && data[SubArr[loop]].IsDeliver == 1 && data[SubArr[loop]].Return == 1) {

          this.isCompleteCount++

        }

      }

      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {


        type: 'doughnut',

        data: {

          labels: ["Booked Order", "Confirm Order", "Deliver Order", "Complete Order", "Cancle Order"],

          datasets: [{

            data: [this.isBookedCount, this.isConfirmCount, this.isDeliverCount, this.isCompleteCount, this.isCencleCount],

            backgroundColor: [

              '#6666ff',

              '#ADFF2F',

              '#ffff00',

              '#D2B48C',

              '#ff0000',

            ],

            hoverBackgroundColor: [

              "#b2b2ff",

              "#90EE90",

              "#ffffb2",

              "#FFF8DC",

              "#ff7f7f",

            ]

          }]

        }


      });

    })




  }

  ionViewDidLoad() {
    this.GraphData();
  }

  GotoViewOrder() {
    this.navCtrl.push(FurnitureViewBookorderPage)
  }

  GotoClient() {
    this.navCtrl.push(MainHomePage)
  }

  GotoAddSlider() {
    this.navCtrl.push(AddSliderPage)
  }

  GotoViewSlider() {
    this.navCtrl.push(ViewSliderPage)
  }

  GotoAddProduct() {
    this.navCtrl.push(AddProductPage)
  }

  GotoViewProduct() {
    this.navCtrl.push(ViewProductPage)
  }


  GotoAddCategory() {
    this.navCtrl.push(AddCategoryPage)
  }


  GotoViewCategory() {
    this.navCtrl.push(ViewCategoryPage)
  }


}
