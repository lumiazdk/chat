import { _ } from "meteor/underscore";
import { Controller } from "angular-ecmascript/module-helpers";
import axios from "axios";

export default class ProfileCtrl extends Controller {
    constructor($scope) {
        super(...arguments);
        let that = this;
        this.helpers({
            profile() {
                return that.currentUser;
            }
        });
        this.$scope.uploadImage = function(files) {
            // 上传代码
            console.log(files);
            that.upload(files);
        };
        this.loading = false;
    }
    upload(files) {
        let that = this;
        let formData = new FormData();
        formData.append("files", files[0]);
        this.loading = true;
        axios({
            method: "post",
            url: "/upload",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: formData
        }).then(res => {
            console.log(res);
            if (res.data.code == 0) {
                let data = res.data.data;
                this.callMethod("updatePicture", data, err => {
                    if (!err) {
                        this.loading = false;

                        layer.open({
                            content: "修改成功",
                            skin: "msg",
                            time: 2 //2秒后自动关闭
                        });
                    }
                });
            } else {
                this.loading = false;

                layer.open({
                    content: "修改失败",
                    skin: "msg",
                    time: 2 //2秒后自动关闭
                });
            }
        });
    }
    updateName() {
        if (_.isEmpty(this.profile.username)) return;

        this.callMethod("updateName", this.profile.username, err => {
            if (err) return this.handleError(err);
            this.$state.go("tab.chats");
        })
    }

    handleError(err) {
        if (err.error == "cancel") return;
        this.$log.error("Profile save error ", err);

        this.$ionicPopup.alert({
            title: err.reason || "Save failed",
            template: "Please try again",
            okType: "button-positive button-clear"
        });
    }
}

ProfileCtrl.$name = "ProfileCtrl";
ProfileCtrl.$inject = ["$state", "$ionicLoading", "$ionicPopup", "$log"];
