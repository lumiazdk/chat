import { Meteor } from "meteor/meteor";
import { Controller } from "angular-ecmascript/module-helpers";
import { Accounts } from "meteor/accounts-base";
import { check } from "meteor/check";

export default class RegisterCtrl extends Controller {
    register() {
        if (_.isEmpty(this.username)) {
            layer.open({
                content: "请输入昵称",
                skin: "msg",
                time: 2 //2秒后自动关闭
            });
            return;
        }
        if (_.isEmpty(this.email)) {
            layer.open({
                content: "请输入电子邮件",
                skin: "msg",
                time: 2 //2秒后自动关闭
            });
            return;
        }
        if (_.isEmpty(this.password)) {
            layer.open({
                content: "请输入密码",
                skin: "msg",
                time: 2 //2秒后自动关闭
            });
            return;
        }
        if (_.isEmpty(this.repassword)) {
            layer.open({
                content: "请确认密码",
                skin: "msg",
                time: 2 //2秒后自动关闭
            });
            return;
        }
        if (this.password != this.repassword) {
            layer.open({
                content: "两次密码不一致",
                skin: "msg",
                time: 2 //2秒后自动关闭
            });
            return;
        }
        let registerData = {
            username: this.username,
            email: this.email,
            password: this.password,
            profile: {
                autograph: this.autograph,
                photo: "http://phnlqajge.bkt.clouddn.com/timg.jpg"
            }
        };

        Accounts.createUser(registerData, res => {
            if (res) {
                if (res.reason == "Email already exists.") {
                    layer.open({
                        content: "账户已存在",
                        skin: "msg",
                        time: 2 //2秒后自动关闭
                    });
                    return;
                }
            } else {
                layer.open({
                    content: "创建成功",
                    skin: "msg",
                    time: 2 //2秒后自动关闭
                });
                this.$state.go("tab.chats");
            }
        });
    }

    handleError(err) {
        this.$log.error("Settings modification error", err);

        this.$ionicPopup.alert({
            title: err.reason || "Settings modification failed",
            template: "Please try again",
            okType: "button-positive button-clear"
        });
    }
}
RegisterCtrl.$name = "RegisterCtrl";
RegisterCtrl.$inject = ["$state", "$ionicPopup", "$log"];
