import { _ } from "meteor/underscore";
import { Accounts } from "meteor/accounts-base";
import { Controller } from "angular-ecmascript/module-helpers";
import { Friends } from "../../../lib/collections";

export default class searchFriendsCtrl extends Controller {
    constructor() {
        super(...arguments);
        this.subscribe("users");
        this.helpers({
            data() {
                console.log(Friends.find());
                return Friends.find();
            },
            users() {
                return Meteor.users.find();
            }
        });
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
    sureAddFriend() {
        var confirmPopup = $ionicPopup.confirm({
            title: "Consume Ice Cream",
            template: "Are you sure you want to eat this ice cream?"
        });
        confirmPopup.then(function(res) {
            if (res) {
                console.log("You are sure");
            } else {
                console.log("You are not sure");
            }
        });
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

searchFriendsCtrl.$name = "searchFriendsCtrl";
searchFriendsCtrl.$inject = ["$state", "$ionicLoading", "$ionicPopup", "$log"];
