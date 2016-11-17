import {Component} from '@angular/core';
import {Platform, NavParams, ViewController, Page} from 'ionic-angular';
import {Foods} from "../../../lib/collections/Foods";
var moment = require('moment/moment');

@Component({
    templateUrl: '/client/components/modal/additem.html'
})
export class AddItemModalPage {
    constructor(
        public platform:Platform,
        public params:NavParams,
        public viewCtrl:ViewController) {

        }

    name = '';
    type = 'grocery';
    location = 'Counter';
    price = '';
    expiration = moment().format('YYYY-MM-DD');

    addItem(){
        console.log(this.name);
        Foods.insert({
            userId: Meteor.userId(),
            type: this.type,
            name: this.name,
            location: this.location,
            price: this.price,
            expiration: this.expiration,
            status: 'fresh',
            createdAt: new Date().valueOf(),
        })
        this.dismiss()
    }

    isFormValid():boolean {
        let nameValid = this.name != null && this.name.length > 0;
        let priceValid = this.price != null && this.price != '' && !isNaN(Number(this.price)) && Number(this.price) >=0;
        return nameValid && priceValid;
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}