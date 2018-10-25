import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Accounts } from 'meteor/accounts-base';

export default class RegisterCtrl extends Controller {
    register() {
        var registerData = {
            email: this.email,
            password: this.password
         }
        Accounts.createUser(registerData, (res)=>{
            if (!res) return;
            console.log(res)

        })
    }

    handleError(err) {
        this.$log.error('Settings modification error', err);

        this.$ionicPopup.alert({
            title: err.reason || 'Settings modification failed',
            template: 'Please try again',
            okType: 'button-positive button-clear'
        });
    }
}
RegisterCtrl.$name = 'RegisterCtrl';
RegisterCtrl.$inject = ['$state', '$ionicPopup', '$log'];