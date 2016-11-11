import {Page, NavController, ModalController, AlertController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {AddItemModalPage} from '../../components/modal/additem';
import {Foods} from "../../../lib/collections/Foods";
import {Transactions} from "../../../lib/collections/Transactions";
import { Observable } from 'rxjs/Observable';

import {PluckThenSumPipe} from '../../lib/pluck-then-sum.pipe';

@Page({
    templateUrl: '/client/pages/budget/budget.html',
    pipes: [TranslatePipe, PluckThenSumPipe]
})
export class BudgetPage extends MeteorComponent {
    private user:Meteor.User;
    private budget:number;
    private spent:number = 0;
    foods: Observable<any[]>;
    

    private budgetPromptOpen:boolean = false;

    constructor(public nav:NavController, public modalCtrl:ModalController,
                public alertCtrl:AlertController) {
        super();
        this.foods = Foods.find({ userId: Meteor.userId(), status: "fresh" }, {sort: {expiration: 1}}).zone();
        this.loadFood();
        this.loadTransactions();
    }

    private loadFood() {

    }

    private loadTransactions() {

    }

    ngOnInit():void {
        this.autorun(() => {
            this.user = Meteor.user();
            console.log(this.user);
            console.log(this.user.profile);
            if(this.user.profile)
                this.budget = this.user.profile.budget;
            else
                this.budget = 0;
            
            if(!this.budget) {
                this.setBudget();
            }
        });
    }

    setBudget() {
        if(this.budgetPromptOpen == true) {
            return;
        }
        let prompt = this.alertCtrl.create({
            title: 'Weekly Budget',
            message: 'How many dollars a week to you spend on food?',
            inputs: [{
                name: 'dollars',
                placeholder: '75'
                }
            ],
            buttons: [
                {
                    text: 'Save',
                    handler: data => {
                        let num = Number(data.dollars);
                        console.log(num);
                        if(num <= 0) {
                            //this.addBudget();
                        }
                        else {
                            this.saveNewBudget(num);
                        }
                    }
                }
            ]
        });
        prompt.onDidDismiss(() => {
            this.budgetPromptOpen = false;
        })
        this.budgetPromptOpen = true;
        prompt.present();
    }

    saveNewBudget(newBudget:number) {
        console.debug("Updating budget");
        Meteor.users.update(Meteor.userId(), {
            $set: {
                profile: {
                    budget: newBudget
                }
            }
        }, (err) => {
            console.debug("budget saved");
            this.budget = newBudget;
        });
    }

    addFoodItem():void {
        let modal = this.modalCtrl.create(AddItemModalPage);
        modal.present();
    }
}
