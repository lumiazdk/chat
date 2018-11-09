import Moment from "moment";
import 'moment/locale/zh-cn'
import { Controller } from "angular-ecmascript/module-helpers";
import { Chats } from "../../../lib/collections";
export default class ChatsCtrl extends Controller {
    constructor() {
        super(...arguments);
        this.subscribe("users");
        this.helpers({
            data() {
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
    tochat(item){
        this.$state.go("tab.chat",{chatId:item._id});
    }
    
}

ChatsCtrl.$name = "ChatsCtrl";
ChatsCtrl.$inject = ["NewChat",'$state'];
