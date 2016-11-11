import {Page, NavController, ModalController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import { addTransactionPage } from '../../components/modal/addTransaction';


@Page({
    templateUrl: '/client/pages/budget/budget.html',
    pipes: [TranslatePipe]
})
export class BudgetPage extends MeteorComponent {
    private user:Meteor.User;

    constructor(private nav:NavController, private modalCtrl:ModalController) {
        super();
    }

    ngOnInit():void {
        this.autorun(() => {
            this.user = Meteor.user();
        });
    }

    addBudget() {
        alert("Popup...");
    }

    addTrans() {
    let modal = this.modalCtrl.create(addTransactionPage);
    modal.present();
  }
}
