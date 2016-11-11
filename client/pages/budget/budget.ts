import {Page, NavController, ModalController, AlertController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import { addTransactionPage } from '../../components/modal/addTransaction';
import {Foods} from "../../../lib/collections/Foods";
import { Observable } from 'rxjs/Observable';
var moment = require('moment/moment');

@Page({
    templateUrl: '/client/pages/budget/budget.html',
    pipes: [TranslatePipe]
})
export class BudgetPage extends MeteorComponent {
    private transactions:Observable<any[]>;
    private user:Meteor.User;
    private budget:number;
    private spent:number = 0;

    private week:number = 0;

    private budgetPromptOpen:boolean = false;

    constructor(public nav:NavController, public modalCtrl:ModalController,
                public alertCtrl:AlertController) {
        super();
        this.loadTransactions();
    }

    private loadTransactions() {
        let range = this.getWeekRange(this.week);
        
    }

    private getWeekRange(week:number) {
        let start;
        let end;
        if(week > 0) {
            start = moment().add(week, 'weeks').startOf('isoWeek');
            end = moment().add(week, 'weeks').endOf('isoWeek');
        } else if(week < 0) {
            start = moment().subtract(week, 'weeks').startOf('isoWeek');
            end = moment().subtract(week, 'weeks').endOf('isoWeek');
        } else {
            start = moment().startOf('isoWeek');
            end = moment().endOf('isoWeek');
        }

        return {
            start: start,
            end: end
        };
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

    addTrans() {
        let modal = this.modalCtrl.create(addTransactionPage);
        modal.present();
    }
}
