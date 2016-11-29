import {Page, NavController, ActionSheetController, ModalController, ToastController} from 'ionic-angular';
import { EditItemModalPage } from "../../components/modal/edititem";
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

    private variation:string = "1";

    constructor(private nav:NavController, private translate:TranslateService, 
        public actionSheetCtrl: ActionSheetController, private modalCtrl:ModalController, private toastCtrl:ToastController) {
        super();

        this.foods = Foods.find({ userId: Meteor.userId(), type: "grocery", status: "fresh" }, {sort: {expiration: 1}}).zone();

        if(window.location.pathname != "/")
            this.variation = window.location.pathname.substr(1);
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

    editFoodItem(item):void {
        let modal = this.modalCtrl.create(EditItemModalPage, {item:item});
        modal.onDidDismiss(data => {
            if(data.success) {
                let toast = this.toastCtrl.create({
                                message: data.toastMsg,
                                duration: 3000,
                                position: 'top'
                            });
                toast.present();
            }
        });
        modal.present();
    }

    addFoodItem():void {
        let modal = this.modalCtrl.create(AddItemModalPage);
        modal.onDidDismiss(data => {
            if(data.success) {
                let toast = this.toastCtrl.create({
                                message: data.toastMsg,
                                duration: 5000,
                                position: 'top'
                            });
                toast.present();
            }
        });
        modal.present();
    }
}
