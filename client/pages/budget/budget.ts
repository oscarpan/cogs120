import {Page, NavController, ModalController, AlertController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {AddItemModalPage} from '../../components/modal/additem';
import { EditItemModalPage } from "../../components/modal/edititem";
import {Foods} from "../../../lib/collections/Foods";
import { Observable } from 'rxjs/Observable';
var moment = require('moment/moment');
import {PluckThenSumPipe} from '../../lib/pluck-then-sum.pipe';

@Page({
    templateUrl: '/client/pages/budget/budget.html',
    pipes: [TranslatePipe, PluckThenSumPipe]
})
export class BudgetPage extends MeteorComponent {
    private transactions:Observable<any[]>;
    private user:Meteor.User;
    private budget:number;
    private spent:number = 0;

    private variation:string = "1";
    private weekLabel:string = "";
    private week:number = 0;
    foods: Observable<any[]>;

    private budgetPromptOpen:boolean = false;

    constructor(public nav:NavController, public modalCtrl:ModalController,
                public alertCtrl:AlertController) {
        super();
        this.loadTransactions();

        if(window.location.hash != "")
            this.variation = window.location.hash.substr(1);
        console.log(window.location.hash);
    }

    private getWeekLabel():String {

        let range = this.getWeekRange(this.week);
        let start = moment(range.start).format('l');
        let end = moment(range.end).format('l');

        return start + " - " + end;
    }

    private loadTransactions() {
        console.debug("Loading transactions");
        let range = this.getWeekRange(this.week);
        console.debug(JSON.stringify(range));
        this.foods = Foods.find({ userId: Meteor.userId(),
            createdAt: {
                $gte: range.start.getTime(),
                $lt: range.end.getTime()
            }
        }, {sort: {expiration: 1}}).zone();
    }

    private previousWeek() {
        this.week += 1;
        this.loadTransactions();
    }

    private nextWeek() {
        this.week -= 1;
        this.loadTransactions();
    }

    private getWeekRange(week:number):any {
        let start;
        let end;
        if(week > 0) {
            start = moment().subtract(week, 'weeks').startOf('isoWeek').toDate();
            end = moment().subtract(week, 'weeks').endOf('isoWeek').toDate();
        } else {
            start = moment().startOf('isoWeek').toDate();
            end = moment().endOf('isoWeek').toDate();
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

    addFoodItem():void {
        let modal = this.modalCtrl.create(AddItemModalPage);
        modal.present();
    }

    editFoodItem(item):void {
        let modal = this.modalCtrl.create(EditItemModalPage, {item:item});
        modal.present();
    }

    deleteFood(food){
        Foods.remove(food._id);
    }
}
