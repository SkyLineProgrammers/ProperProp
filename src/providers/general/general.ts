import { Injectable } from '@angular/core';

/*
  Generated class for the GeneralProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeneralProvider {

  UserInfo = [];
  UserName = "";
  UserAddtoCart: any;
  public IsLoggedID = false;
  private _DeviceID = "-2";
  public IsAdmin = false;
  public IsMovetoCart = false;
  public IsMovetoOrders = false;
  public CustomImages = [];
  public WishListIDs = [];
  public ProductIDs = [];
  public IsRemoved = false;
  public IsAdded = false;
  AppSliders = [];
  constructor() {
    console.log('Hello GeneralProvider Provider');
  }

  setUserInfo(param) {
    let A = [];
    A.push(param)
    this.UserInfo = A;
  }

  setUserName(param) {
    this.UserName = param;
  }

  set DeviceID(ID) {
    this._DeviceID = ID;
  }
  get DeviceID() {
    return this._DeviceID;
  }
}
