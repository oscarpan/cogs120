import {Page, ViewController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {User} from '../../lib/usermock';
//TODO change templateUrl
@Page({
    templateUrl: 'client/components/modal/login.html',
    pipes: [TranslatePipe]
})
//TODO change class name
export class LoginModal extends MeteorComponent {
    private user:Meteor.User;

    constructor(public viewCtrl:ViewController) {
        super();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    login():void {
        User.loggedIn = true;
        this.dismiss();
    }
}