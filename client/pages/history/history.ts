import {Page, NavController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import { Observable } from 'rxjs/Observable';
import {Foods} from "../../../lib/collections/Foods";

import {MomentModule, DifferencePipe} from 'angular2-moment';

//TODO change templateUrl
@Page({
    templateUrl: '/client/pages/history/history.html',
    pipes: [DifferencePipe]
})
//TODO change class name
export class HistoryPage extends MeteorComponent {
    private user:Meteor.User;
    foods: Observable<any[]>;

    constructor(private nav:NavController,
                private translate:TranslateService) {
        super();

        this.foods = Foods.find({ userId: Meteor.userId(), status: { $ne: "fresh" } }, {sort: {expiration: 1}}).zone();
    }

    ngOnInit():void {
        this.autorun(() => {
            this.user = Meteor.user();
        });
    }
}