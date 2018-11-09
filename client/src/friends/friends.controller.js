import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Friends,Chats } from '../../../lib/collections';

export default class friendsCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.subscribe("Friends");
    this.helpers({

      friendsList() {
        let data = Friends.find({ userId: Meteor.userId() }).fetch()

        console.log(data)
        return data
      }
    });

  }
  toSearchFriends() {
    console.log(22)
    this.$state.go('tab.searchFriends')
  }
  remove(chat) {
    this.callMethod("removeChat", chat._id);
  }
  newChat(userId) {
    let chat = Chats.findOne({ userIds: { $all: [this.currentUserId, userId] } });
    console.log(userId)
    if (chat) {
      return this.goToChat(chat._id);
    }

    this.callMethod('newChat', userId, (err, chatId) => {
      if (err) return this.handleError(err);
      this.goToChat(chatId);
    });
  }

  goToChat(chatId) {
    this.$state.go('tab.chat', { chatId });
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
