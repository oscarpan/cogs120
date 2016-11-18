import {Component} from '@angular/core';
import {Platform, NavParams, ViewController, Page} from 'ionic-angular';
import { Mongo } from 'meteor/mongo'
import {Foods} from "../../../lib/collections/Foods";
var moment = require('moment/moment');

@Component({
    templateUrl: '/client/components/modal/edititem.html'
})
export class EditItemModalPage {
    item:any;
    name:String;
    type:String;
    location:String;
    price:String;
    expiration:any;
    constructor(
        public platform:Platform,
        public params:NavParams,
        public viewCtrl:ViewController) {
            this.item = params.get('item');
            this.name = this.item.name;
            this.type = this.item.type;
            this.location = this.item.location;
            this.price = this.item.price;
            this.expiration = moment(this.item.expiration).format('YYYY-MM-DD');
        }
    
    editItem(){
        console.log(this.name);
        console.log(this.viewCtrl);
        this.item.type = this.type;
        this.item.name = this.name;
        this.item.location = this.location;
        this.item.price = this.price;
        this.item.expiration = this.expiration;
        Foods.update({_id: this.item._id}, this.item);
        this.viewCtrl.dismiss();
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