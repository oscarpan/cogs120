import {Page, NavController, ActionSheetController, ModalController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {WelcomeHeaderComponent} from '../../components/welcome-header/welcome-header';
import {LanguageSelectComponent} from "../../components/language-select/language-select";
import { AddItemModalPage } from '../../components/modal/additem';
import { Observable } from 'rxjs/Observable';
import {Foods} from "../../../lib/collections/Foods";

@Page({
    templateUrl: '/client/pages/home/home.html',
    pipes: [TranslatePipe],
    directives: [WelcomeHeaderComponent, LanguageSelectComponent] // !important! required to get custom component to show up
})
export class HomePage extends MeteorComponent {
    private user:Meteor.User;
    foods: Observable<any[]>;

    constructor(private nav:NavController, private translate:TranslateService, public actionSheetCtrl: ActionSheetController, private modalCtrl:ModalController) {
        super();

        this.foods = Foods.find({}).zone();
    }

    presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Food Actions',
            buttons: [
                {
                    text: 'Eat it!',
                    role: 'destructive',
                    handler: () => {
                        console.log('Eat it clicked');
                    }
                },{
                    text: 'Trash it!',
                    handler: () => {
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
