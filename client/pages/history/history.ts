import {Page, NavController, ModalController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import { Observable } from 'rxjs/Observable';
import {Foods} from "../../../lib/collections/Foods";
import { EditItemModalPage } from "../../components/modal/edititem";

import {MomentModule, DifferencePipe} from 'angular2-moment';
import {PluckThenSumPipe} from '../../lib/pluck-then-sum.pipe';

//TODO change templateUrl
@Page({
    templateUrl: '/client/pages/history/history.html',
    pipes: [DifferencePipe, PluckThenSumPipe]
})
//TODO change class name
export class HistoryPage extends MeteorComponent {
    private user:Meteor.User;
    foods: Observable<any[]>;

    constructor(private nav:NavController,
                private translate:TranslateService,
                private modalCtrl:ModalController) {
        super();

        this.foods = Foods.find({ userId: Meteor.userId(), status: { $ne: "fresh" } }, {sort: {expiration: 1}}).zone();
    }

    ngOnInit():void {
        this.autorun(() => {
            this.user = Meteor.user();
        });
    }

    editFoodItem(item):void {
        let modal = this.modalCtrl.create(EditItemModalPage, {item:item});
        modal.present();
    }

    deleteFood(food){
        Foods.remove(food._id);
    }
}