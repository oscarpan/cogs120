import {Page, NavController, ActionSheetController, ModalController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {WelcomeHeaderComponent} from '../../components/welcome-header/welcome-header';
import {LanguageSelectComponent} from "../../components/language-select/language-select";
import { AddItemModalPage } from '../../components/modal/additem';
import { Observable } from 'rxjs/Observable';
import {Foods} from "../../../lib/collections/Foods";

import {MomentModule, DifferencePipe} from 'angular2-moment';
import {PluckThenSumPipe} from '../../lib/pluck-then-sum.pipe';

@Page({
    templateUrl: '/client/pages/home/home.html',
    pipes: [DifferencePipe, PluckThenSumPipe],
    directives: [WelcomeHeaderComponent, LanguageSelectComponent] // !important! required to get custom component to show up
})
export class HomePage extends MeteorComponent {
    private user:Meteor.User;
    foods: Observable<any[]>;

    constructor(private nav:NavController, private translate:TranslateService, public actionSheetCtrl: ActionSheetController, private modalCtrl:ModalController) {
        super();

        this.foods = Foods.find({ userId: Meteor.userId(), type: "grocery", status: "fresh" }, {sort: {expiration: 1}}).zone();
    }

    deleteFood(food){
        Foods.remove(food._id);
    }

    presentActionSheet(food) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Food Actions',
            buttons: [
                {
                    text: 'Eat it!',
                    role: 'destructive',
                    handler: () => {
                        Foods.update(food._id, { $set: { status: 'eaten' } });
                        console.log('Eat it clicked');
                    }
                },{
                    text: 'Trash it!',
                    handler: () => {
                        Foods.update(food._id, { $set: { status: 'trashed' } });
                        console.log('Trash it clicked');
                    }
                },{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    ngOnInit():void {
        this.autorun(() => {
            this.user = Meteor.user();
        });
    }

    addFoodItem():void {
        let modal = this.modalCtrl.create(AddItemModalPage);
        modal.present();
    }
}
