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
    location = '';
    portions = '';
    price = '';
    expiration = moment().format('YYYY-MM-DD');

    addItem(){
        console.log(this.name);
        Foods.insert({
            'name': this.name,
            'location': this.location,
            'portions': this.portions,
            'price': this.price,
            'expiration': this.expiration,
            'status': 'fresh',
        })
        this.dismiss()
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}