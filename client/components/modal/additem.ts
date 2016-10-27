import {Component} from '@angular/core';
import {Platform, NavParams, ViewController, Page} from 'ionic-angular';

@Component({
    templateUrl: '/client/components/modal/additem.html'
})
export class AddItemModalPage {
    constructor(
        public platform:Platform,
        public params:NavParams,
        public viewCtrl:ViewController) {

        }

        dismiss() {
            this.viewCtrl.dismiss();
        }
}