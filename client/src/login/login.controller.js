import { _ } from "meteor/underscore";
import { Accounts } from "meteor/accounts-base";
import { Controller } from "angular-ecmascript/module-helpers";
import { Users } from "../../../lib/collections";

export default class LoginCtrl extends Controller {
    constructor() {
        super(...arguments);
        this.subscribe("users");
        this.helpers({
            users() {
                return Meteor.users.find({
                    "emails.address": "1126572821@qq.com"
                });
            }
        });
    }
    login() {
        let that = this;
        if (_.isEmpty(this.email)) {
            layer.msg("请输入电子邮件");
            return;
        }
        if (_.isEmpty(this.password)) {
            layer.msg("请输入密码");

            return;
        }

        let user = {
            email: this.email
        };
        check(
            user,
            Match.OneOf({
                email: String
            })
        );
        let password = this.password;
        Meteor.loginWithPassword(user, password, function(error) {
            if (error) {
                if (error.reason == "User not found") {
                    layer.msg("暂无此用户");
                } else if (error.reason == "Incorrect password") {
                    layer.msg("密码不正确");
                }
            } else {
                layer.msg("登陆成功");

                that.$state.go("tab.chats");
            }

        });
    }
    logout() {
        Meteor.logout(res => {
            console.log(22);

            layer.msg("退出成功");
        });
    }
    toregister() {
        this.$state.go("register");
    }
    forgotpassword() {
        // Accounts.forgotPassword('112657222821@qq.com', function (res) {
        //   console.log(res)
        // })
        console.log(this.users);

        Accounts.sendResetPasswordEmail("111", ["1126572821@qq.com"], {});
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

LoginCtrl.$name = "LoginCtrl";
LoginCtrl.$inject = ["$state", "$ionicLoading", "$ionicPopup", "$log"];
