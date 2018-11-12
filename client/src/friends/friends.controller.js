import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Friends, Chats } from '../../../lib/collections';

export default class friendsCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.subscribe("Friends");
    this.subscribe("users");

    this.helpers({

      friendsList() {
        let data = Friends.find({ userId: Meteor.userId() }).fetch()
        return data
      }
    });

  }
  toSearchFriends() {
    this.$state.go('tab.searchFriends')
  }
  remove(friend) {
    let confirmPopup = this.$ionicPopup.confirm({
      title: "删除好友",
      template: "你确定删除此好友吗？",
      buttons: [
        { text: "取消" },
        {
          text: "<b>确定</b>",
          type: "button-positive",
          onTap: function (e) {

            Friends.remove({ _id: friend._id }, function (err) {
              console.log(err);
              if (!err) {
                layer.msg("删除成功");
                return;
              } else {
                layer.msg("删除失败");
                return;
              }
            });
          }
        }
      ]
    });
  }
  newChat(userId) {
    let chat = Chats.findOne({ userIds: { $all: [this.currentUserId, userId] } });
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
