import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';

export default class LoginCtrl extends Controller {
  login() {
    if (_.isEmpty(this.email)) return;

    // const confirmPopup = this.$ionicPopup.confirm({
    //   title: '确认手机号',
    //   template: '<div>' + this.phone + '</div><div>确定使用这个手机号登录吗?</div>',
    //   cssClass: 'text-center',
    //   okText: '是',
    //   okType: 'button-positive button-clear',
    //   cancelText: '编辑',
    //   cancelType: 'button-dark button-clear'
    // });

    // confirmPopup.then((res) => {
    //   if (!res) return;

    //   this.$ionicLoading.show({
    //     template: 'Sending verification code...'
    //   });

    //   Accounts.requestPhoneVerification(this.phone, (err) => {
    //     this.$ionicLoading.hide();
    //     if (err) return this.handleError(err);
    //     this.$state.go('confirmation', { phone: this.phone });
    //   });
    // });
    console.log(this.email)
    console.log(this.password)
    let user = {
      email: this.email.toString()
    }
    let password = this.password.toString()
    console.log(Meteor.users.find());
    Meteor.loginWithPassword(user, password, function (error) {

      if (error) {

        console.log(error.reason);

      } else {


      }

    });
  }
  logout() {
    Meteor.logout((res) => {
      console.log(22)
      if (!res) return;
      console.log(res)
    })
  }
  handleError(err) {
    this.$log.error('Login error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Login failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}

LoginCtrl.$name = 'LoginCtrl';
LoginCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];
