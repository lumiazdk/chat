import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats, Messages } from '../../../lib/collections';
import { MeteorCameraUI } from 'meteor/okland:camera-ui';
import Ionic from 'ionic-scripts';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
export default class ChatCtrl extends Controller {
    constructor() {
        super(...arguments);

        this.chatId = this.$stateParams.chatId;
        this.isIOS = Ionic.Platform.isWebView() && Ionic.Platform.isIOS();
        this.isCordova = Meteor.isCordova;
        this.helpers({
            messages() {
                return Messages.find({ chatId: this.chatId });
            },
            data() {
                
                return Chats.findOne(this.chatId);
            }
        });
        
        this.autoScroll();
        
    }
    sendPicture() {
        MeteorCameraUI.getPicture({}, (err, data) => {
          if (err) return this.handleError(err);
     
          this.callMethod('newMessage', {
            picture: data,
            type: 'picture',
            chatId: this.chatId,
            userId:localStorage.getItem('Meteor.userId')

          });
        });
      }
     
    sendMessage() {
        if (_.isEmpty(this.message)) return;
        console.log(localStorage.getItem('Meteor.userId'))
        this.callMethod('newMessage', {
            text: this.message,
            type: 'text',
            chatId: this.chatId,
            userId:localStorage.getItem('Meteor.userId')
        });

        delete this.message;
    }
    autoScroll() {
        let recentMessagesNum = this.messages.length;
     
        this.autorun(() => {
          const currMessagesNum = this.getCollectionReactively('messages').length;
          const animate = recentMessagesNum != currMessagesNum;
          recentMessagesNum = currMessagesNum;
          this.scrollBottom(animate);
        });
      }
    inputUp() {
        if (this.isIOS) {
            this.keyboardHeight = 216;
        }

        this.scrollBottom(true);
    }

    inputDown() {
        if (this.isIOS) {
            this.keyboardHeight = 0;
        }

        this.$ionicScrollDelegate.$getByHandle('chatScroll').resize();
    }

    closeKeyboard() {
        if (this.isCordova) {
            cordova.plugins.Keyboard.close();
        }
    }

    scrollBottom(animate) {
        this.$timeout(() => {
            this.$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
        }, 300);
    }
    goback() {
        this.$state.go('tab.chats')
    }
    handleError(err) {
        if (err.error == 'cancel') return;
        this.$log.error('Profile save error ', err);
     
        this.$ionicPopup.alert({
          title: err.reason || 'Save failed',
          template: 'Please try again',
          okType: 'button-positive button-clear'
        });
      }
      
}

ChatCtrl.$name = 'ChatCtrl';
ChatCtrl.$inject = ['$stateParams', '$timeout', '$ionicScrollDelegate', '$ionicPopup', '$log','$state'];