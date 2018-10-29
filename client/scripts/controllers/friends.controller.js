import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Friends } from '../../../lib/collections';

export default class friendsCtrl extends Controller {
  constructor() {
    super(...arguments);
    
  }
 toSearchFriends(){
   console.log(22)
  this.$state.go('tab.searchFriends')
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

friendsCtrl.$name = 'friendsCtrl';
friendsCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];
