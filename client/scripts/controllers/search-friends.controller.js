import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Friends } from '../../../lib/collections';

export default class searchFriendsCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.helpers({
      data() {
        console.log(Friends.find())
        return Friends.find();
      },
      users(){
        return Meteor.users.find();
        
      }
    });
  }
  search() {
console.log(22)
console.log(this.keyValue)
console.log(Friends.find().fetch());
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

searchFriendsCtrl.$name = 'searchFriendsCtrl';
searchFriendsCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];
