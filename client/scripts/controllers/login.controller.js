import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Users } from '../../../lib/collections';

export default class LoginCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.subscribe('users');
    this.helpers({
      users() {
        return Meteor.users.find({ 'emails.address': '1126572821@qq.com' });
      }
    });
  }
  login() {
    var that = this
    if (_.isEmpty(this.email)) {
      layer.open({
        content: '请输入电子邮件'
        , skin: 'msg'
        , time: 2 //2秒后自动关闭
      });
      return
    }
    if (_.isEmpty(this.password)) {
      layer.open({
        content: '请输入密码'
        , skin: 'msg'
        , time: 2 //2秒后自动关闭
      });
      return
    }


    var user = {
      email: this.email
    }
    check(user, Match.OneOf(
      {
        email: String,
      },
    ));
    var password = this.password
    Meteor.loginWithPassword(user, password, function (error) {

      if (error) {
        if (error.reason == 'User not found') {
          layer.open({
            content: '暂无此用户'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
          });
        } else if (error.reason == 'Incorrect password') {
          layer.open({
            content: '密码不正确'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
          });
        }
      } else {
        layer.open({
          content: '登陆成功'
          , skin: 'msg'
          , time: 2 //2秒后自动关闭
        });
        that.$state.go("tab.chats");
      }

      console.log("ERROR: " + error.reason);

    });
  }
  logout() {
    Meteor.logout((res) => {
      console.log(22)
      layer.open({
        content: '退出成功'
        , skin: 'msg'
        , time: 2 //2秒后自动关闭
      });
    })
  }
  toregister() {
    this.$state.go('register')
  }
  forgotpassword() {
    // Accounts.forgotPassword('112657222821@qq.com', function (res) {
    //   console.log(res)
    // })
    console.log(this.users)

    Accounts.sendResetPasswordEmail('111', ['1126572821@qq.com'], {})
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
