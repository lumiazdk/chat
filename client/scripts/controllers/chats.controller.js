import Moment from "moment";
import 'moment/locale/zh-cn'
import { Controller } from "angular-ecmascript/module-helpers";
import { Chats } from "../../../lib/collections";
export default class ChatsCtrl extends Controller {
    constructor() {
        super(...arguments);

        this.helpers({
            data() {
                console.log(Chats.find())
                return Chats.find();
            }
        });
    }
    showNewChatModal() {
        this.NewChat.showModal();
    }
    remove(chat) {
        this.callMethod("removeChat", chat._id);
    }
}

ChatsCtrl.$name = "ChatsCtrl";
ChatsCtrl.$inject = ["NewChat"];
