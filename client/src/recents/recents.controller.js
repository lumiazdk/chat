import { _ } from "meteor/underscore";
import { Controller } from "angular-ecmascript/module-helpers";
import { AddMessage } from "../../../lib/collections";
import { Friends } from "../../../lib/collections";


export default class recentsCtrl extends Controller {
    constructor() {
        super(...arguments);
        this.subscribe("AddMessage");
        this.helpers({

            sendMessageData() {
                let data = AddMessage.find({ userId: Meteor.userId() }).fetch()
                let arr = []
                data.forEach(item => {
                    if (item.selfDelete == 0) {
                        arr.push(item)
                    }
                })
                return arr
            },
            getMessageData() {
                let data = AddMessage.find({ friendId: Meteor.userId() }).fetch()
                let arr = []

                data.forEach(item => {
                    if (item.friendDelete == 0) {
                        arr.push(item)
                    }
                })
                return arr
            }
        });
    }
    getAddMessage() {
        let data = AddMessage.find({}).fetch()
    }

    userLists = [];
    search() {
        if (_.isEmpty(this.keyValue)) {
            this.userLists = [];
            return;
        }
        this.userLists = Meteor.users
            .find(
                {
                    "emails.address": { $regex: this.keyValue, $options: "i" }
                },
                { limit: 10 }
            )
            .fetch();
    }
    sureAddFriend(item) {
        let confirmPopup = this.$ionicPopup.confirm({
            title: "好友",
            template: "你确定发送添加好友请求吗？",
            buttons: [
                { text: '取消' },
                {
                    text: '<b>确定</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        let message = {
                            userId: Meteor.userId(),
                            friendId: item._id,
                            userdata: Meteor.user(),
                            isSure: false
                        }
                        AddMessage.insert(message, function (err) {
                        });
                    }
                },
            ]
        });

    }
    refuseAddMessage(item) {
        AddMessage.update({ _id: item._id }, { $set: { 'status': 2 } });//2拒绝
    }
    sureAddMessage(item) {
        AddMessage.update({ _id: item._id }, { $set: { 'status': 1 } });//1已同意
        let self = {
            userId: Meteor.userId(),
            friendId: item.userId
        }
        let friend = {
            friendId: Meteor.userId(),
            userId: item.userId
        }
        Friends.insert(self);
        Friends.insert(friend);

    }
    deleteAddMessageSelf(item) {
        AddMessage.update({ _id: item._id }, { $set: { 'selfDelete': 3 } });//3删除

    }
    deleteAddMessageFriend(item) {
        AddMessage.update({ _id: item._id }, { $set: { 'friendDelete': 3 } });//3删除
    }
    handleError(err) {
        this.$log.error("Login error ", err);

        this.$ionicPopup.alert({
            title: err.reason || "Login failed",
            template: "Please try again",
            okType: "button-positive button-clear"
        });
    }
}

recentsCtrl.$name = "recentsCtrl";
recentsCtrl.$inject = ["$state", "$ionicLoading", "$ionicPopup", "$log"];
