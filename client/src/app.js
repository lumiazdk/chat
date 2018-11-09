// Libs
import "angular-animate";
import "angular-meteor";
import "angular-sanitize";
import "angular-ui-router";
import "angular-moment";
import "ionic-scripts";
import "layui-layer";

import Angular from "angular";
import Loader from "angular-ecmascript/module-loader";
import InputDirective from "../scripts/directives/input.directive";
import { Meteor } from "meteor/meteor";
// Modules
import ChatsCtrl from "./chats/chats.controller";
import ChatCtrl from "./chat/chat.controller";
import CalendarFilter from "../scripts/filters/calendar.filter";
import ChatNameFilter from "../scripts/filters/chat-name.filter";
import ChatPictureFilter from "../scripts/filters/chat-picture.filter";
import FriendPictureFilter from "../src/friends/friends-picture.filter";
import FriendNameFilter from "../src/friends/friends-name.filter";


import LoginCtrl from "./login/login.controller";
import ConfirmationCtrl from "./confirmation/confirmation.controller";
import ProfileCtrl from "./profile/profile.controller";
import SettingsCtrl from "./settings/settings.controller";
import NewChatCtrl from "./new-chat/new-chat.controller";
import RegisterCtrl from "./register/register.controller";
import FriendsCtrl from "./friends/friends.controller";
import searchFriendsCtrl from "./search-friends/search-friends.controller";
import favoritesCtrl from "./favorites/favorites.controller";
import recentsCtrl from "./recents/recents.controller";

// import RoutesConfig from '../routes';
import NewChatService from "../scripts/services/new-chat.service";
import Routes from "./routes";
import "angular-meteor-auth";
const App = "Whatsapp";

// App
Angular.module(App, [
    "angular-meteor",
    "angularMoment",
    "angular-meteor.auth",
    "ionic"
]);
new Loader(App)
    .load(ChatsCtrl)
    .load(ChatCtrl)
    .load(LoginCtrl)
    .load(NewChatCtrl)
    .load(RegisterCtrl)
    .load(CalendarFilter)
    .load(ChatNameFilter)
    .load(ChatPictureFilter)
    .load(FriendPictureFilter)
    .load(FriendNameFilter)


    .load(ConfirmationCtrl)
    .load(ProfileCtrl)
    .load(SettingsCtrl)
    .load(FriendsCtrl)
    .load(searchFriendsCtrl)
    .load(favoritesCtrl)
    .load(recentsCtrl)

    .load(InputDirective)
    // .load(RoutesConfig)
    .load(NewChatService)
    .load(Routes);

// Startup
if (Meteor.isCordova) {
    Angular.element(document).on("deviceready", onReady);
} else {
    Angular.element(document).ready(onReady);
}

function onReady() {
    Angular.bootstrap(document, [App]);
}
