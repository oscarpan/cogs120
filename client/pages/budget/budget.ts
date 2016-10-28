import {Page, NavController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Page({
    templateUrl: '/client/pages/budget/budget.html',
    pipes: [TranslatePipe]
})
export class BudgetPage extends MeteorComponent {
    private user:MeteorUser;

    constructor(private nav:NavController) {
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
}