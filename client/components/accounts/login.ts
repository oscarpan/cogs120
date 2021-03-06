/// <reference types="meteor-typings" />
import {Page, ViewController, LoadingController} from 'ionic-angular';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base'
import {MeteorComponent} from 'angular2-meteor';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {User} from '../../lib/usermock';
//TODO change templateUrl
@Page({
    templateUrl: 'client/components/accounts/login.html',
    pipes: [TranslatePipe]
})
//TODO change class name
export class LoginModal extends MeteorComponent {
    private user:Meteor.User;

    private username:string;
    private password:string;

    private passwordConfirm:string;
    private creatingAccount:boolean;

    constructor(public viewCtrl:ViewController, public loadingCtrl:LoadingController) {
        super();
        this.creatingAccount = false;
        this.username = "";
        this.password = "";
        this.passwordConfirm = "";
    }

    private login():void {
        if(this.isLoginFormValid()) {
            let loading = this.loadingCtrl.create({
                spinner: "crescent",
                content: "Logging in..."
            });
            loading.present();
            Meteor.loginWithPassword(this.username, this.password, (err) => {
                console.debug("loginWithPassword finished", err);
                loading.dismiss().then(() => {
                    if(err) {
                        alert("Wrong username or password");
                    } else {
                        console.debug("Dismissing modal");
                        this.dismiss();
                    }
                });
            });
        } else {
            alert("You must enter a valid username and password");
        }
    }

    private isLoginFormValid():boolean {
        return this.username.length > 0 && this.password.length > 0; 
    }

    private isCreateAccountFormValid():boolean {
        return this.isLoginFormValid() &&
            this.password === this.passwordConfirm;
    }

    private dismiss():void {
        this.viewCtrl.dismiss();
    }

    private createAccount():void {
        if(this.isCreateAccountFormValid()) {
            let loading = this.loadingCtrl.create({
                spinner: "crescent",
                content: "Creating Account..."
            });
            loading.present();
            Accounts.createUser({
                username: this.username,
                password: this.password,
            }, (err) => {
                console.debug("createUser finished", err);
                loading.dismiss().then(() => {
                    if(err) {
                        alert("Oops! The system was unable to create your account at this time. Try again later");
                        console.error(err);
                    } else {
                        console.debug("Closing modal");
                        this.dismiss();
                    }
                });
            });
        } else {
            alert("Password confirmation does not match");
        }
    }
}