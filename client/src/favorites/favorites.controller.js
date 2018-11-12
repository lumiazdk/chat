import { _ } from "meteor/underscore";
import { Accounts } from "meteor/accounts-base";
import { Controller } from "angular-ecmascript/module-helpers";
import { Dynamic, Fabulous, Comments } from "../../../lib/collections";

export default class favoritesCtrl extends Controller {
    constructor() {
        super(...arguments);
        this.subscribe("Dynamic");
        this.subscribe("Fabulous");
        this.subscribe("Comments");


        this.helpers({
            dynamicList() {
                let data = Dynamic.find().fetch().reverse()
                return data
            }
        });
        $(document).ready(function () {
            /*调起大图 S*/
            var mySwiper = new Swiper('.swiper-container2', {
                loop: false,
                pagination: '.swiper-pagination2',
            })
            $("#list").on("click", ".post img",
                function () {
                    var imgBox = $(this).parents(".post").find("img");
                    console.log(imgBox)
                    var i = $(imgBox).index(this);
                    $(".big_img .swiper-wrapper").html("")
                    for (var j = 0, c = imgBox.length; j < c; j++) {
                        console.log(imgBox.eq(j).attr("src"))

                        $(".big_img .swiper-wrapper").append('<div class="swiper-slide"><div class="cell"><img src="' + imgBox.eq(j).attr("src") + '" / ></div></div>');
                    }
                    mySwiper.updateSlidesSize();
                    mySwiper.updatePagination();
                    $(".big_img").css({
                        "z-index": 1001,
                        "opacity": "1"
                    });
                    mySwiper.slideTo(i, 0, false);
                    return false;
                });

            $(".big_img").on("click",
                function () {
                    $(this).css({
                        "z-index": "-1",
                        "opacity": "0"
                    });

                });
        });
    }
    fabulous(item) {
        if (Fabulous.findOne({ dynamicid: item._id })) {

            var data = Fabulous.findOne({ dynamicid: item._id })
            let pos = data.fabulouspeople.indexOf(Meteor.userId());
            if (pos < 0) {
                data.fabulouspeople.push(Meteor.userId())
            } else {
                data.fabulouspeople.splice(pos, 1)
            }
            Fabulous.update(data._id, { $set: { fabulouspeople: data.fabulouspeople } })

        } else {
            var fabulous = {
                dynamicid: item._id,
                fabulouspeople: [Meteor.userId()]
            }
            Fabulous.insert(fabulous);
        }
        this.dynamicList = Dynamic.find().fetch().reverse()
    }
    sendComment() {
        var item = JSON.parse(JSON.stringify(this.item))
        console.log(item)
        if (this.replyStatus == false) {
            var comment = {
                dynamicid: item._id,
                userId: Meteor.userId(),
                content: this.commentText,
                becomment: 0,
                createdAt: new Date()
            }
        } else {
            var comment = {
                dynamicid: item._id,
                userId: Meteor.userId(),
                content: this.commentText,
                becomment: this.toCommentid,
                createdAt: new Date()
            }
        }

        item.comments.push(comment)
        console.log(item.comments)
        item.comments.forEach(item => {
            delete item.$$hashKey
        })
        // return
        this.callMethod('updateComments', {
            _id: item._id,
            comment: item.comments
        });


    }
    reply(id, item) {
        this.replyStatus = true
        this.item = item
        this.toCommentid = id
        console.log(33)
    }
    commentTap(item) {
        this.replyStatus = false
        this.item = item
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
    showNewDynamicModal() {
        this.NewDynamic.showModal();
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

favoritesCtrl.$name = "favoritesCtrl";
favoritesCtrl.$inject = ["$state", "$ionicLoading", "$ionicPopup", "$log", "NewDynamic"];
