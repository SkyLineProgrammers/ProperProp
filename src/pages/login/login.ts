import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import {} from 'angularfire2/database/';
import { Observable } from 'rxjs/observable';
import firebase from 'firebase';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email = "";
  pass = "";
  itemRef: AngularFireList<any>;
  FinalItem: Observable<any[]>;
  myArray = [];
  BackUpData = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth, private database: AngularFireDatabase) {
    // this.select();
    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }


  registerAuth() {
    this.fire.auth.createUserWithEmailAndPassword(this.email, this.pass).then(data => {
      console.log(data);
      alert("Registered");

    }).catch(error => {
      console.log(error);
    });
  }

  Login() {
    this.fire.auth.signInWithEmailAndPassword(this.email, this.pass).then(data => {
      console.log("Got Some Data : " + this.fire.auth.currentUser.email);
      
      alert("Log In");
      // this.navCtrl.setRosot(HomePage);
    }).catch(error => {
      console.log(error);
    });
  }


  insert() {
    this.database.list("/User/").push({
      Name: this.email,
      pass: this.pass
    });
    alert("Inserted");
    // this.database.list("/User/").push(this.pass);
  }

  select() {
    this.database.object('/User/').valueChanges().subscribe(data => {
      
      let arr = Object.keys(data);
      this.myArray = [];
      this.BackUpData = data;

      for (var i = 0; i < arr.length; i++) {
        const object2 = Object.assign({ Key: arr[i] }, data[arr[i]]);
        this.myArray.push(object2);
      }
      

    })

  }



  delete(param) {
    

    this.database.list('/User/').remove(param.Key);
  }


  Update(param) {
    

    this.database.list('/User/').update(param.Key, {
      Name: 'arqam',
      pass: 234
    })
  }


}
