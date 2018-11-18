import { Meteor } from "meteor/meteor";
import { Controller } from "angular-ecmascript/module-helpers";
import { Accounts } from "meteor/accounts-base";
import { check } from "meteor/check";

export default class RegisterCtrl extends Controller {
    register() {
        if (_.isEmpty(this.username)) {
            layer.msg("请输入昵称");

            return;
        }
        if (!/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(this.email)) {
            layer.msg("请输入正确电子邮件");

            return;
        }
        if (_.isEmpty(this.password)) {
            layer.msg("请输入密码");

            return;
        }
        if (_.isEmpty(this.repassword)) {
            layer.msg("请确认密码");

            return;
        }
        if (this.password != this.repassword) {
            layer.msg("两次密码不一致");

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
                    layer.msg("账户已存在");

                    return;
                }
            } else {
                layer.msg("创建成功");

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
