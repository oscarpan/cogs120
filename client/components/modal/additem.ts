import {Component} from '@angular/core';
import {Platform, NavParams, ViewController, Page} from 'ionic-angular';
import {Foods} from "../../../lib/collections/Foods";

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
    portion = '';
    price = '';
    expiration = '';

    addItem(){
        console.log(this.name);
        Foods.insert({
            'name': this.name,
            'location': this.location,
            'portion': this.portion,
            'price': this.price,
            'expiration': this.expiration,
        })
        this.dismiss()
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}