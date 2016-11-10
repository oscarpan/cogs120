import {Page, ViewController} from 'ionic-angular';
import {Component} from '@angular/core';
import {Platform, NavParams, ViewController, Page} from 'ionic-angular';

@Component({
  templateUrl: '/client/components/modal/addTransaction.html'
})
export class addTransactionPage {

  constructor(private viewCtrl: ViewController) {
  }

  value = '';

  addValue(){
  	console.log(this.value);
  	this.dismiss()
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}