import { _ } from "meteor/underscore";
import { Accounts } from "meteor/accounts-base";
import { Controller } from "angular-ecmascript/module-helpers";
import { AddMessage } from "../../../lib/collections";

export default class recentsCtrl extends Controller {
    constructor() {
        super(...arguments);
        this.subscribe("AddMessage");
        this.helpers({

            sendMessageData() {
                let data = AddMessage.find({ userId: Meteor.userId() }).fetch()
                console.log(data)
                return data
            },
            getMessageData() {
                let data = AddMessage.find({ friendId: Meteor.userId() }).fetch()
                console.log(data)
                return data
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
        console.log(this.userLists);
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
                        console.log(message)
                        AddMessage.insert(message, function (err) {
                            console.log(err)
                        });
                    }
                },
            ]
        });

    }
    refuseAddMessage(item) {
        AddMessage.update({ _id: item._id }, { $set: { 'status': 2 } });
    }
    sureAddMessage(item) {
        AddMessage.update({ _id: item._id }, { $set: { 'status': 1 } });
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
