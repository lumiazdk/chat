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
import userIdNameFilter from "../src/favorites/userId-name.filter";
import userIdPictureFilter from "../src/favorites/userId-picture.filter";
import getFabulousFilter from "../src/favorites/getFabulous.filter";
import getCommentsFilter from "../src/favorites/getComments.filter";
import commentNameFilter from "../src/favorites/commentsName.filter";
import autographFilter from "../src/friends/getAutograph.filter";






import LoginCtrl from "./login/login.controller";
import ConfirmationCtrl from "./confirmation/confirmation.controller";
import ProfileCtrl from "./profile/profile.controller";
import SettingsCtrl from "./settings/settings.controller";
import NewDynamicCtrl from "./new-dynamic/new-dynamic.controller";
import RegisterCtrl from "./register/register.controller";
import FriendsCtrl from "./friends/friends.controller";
import searchFriendsCtrl from "./search-friends/search-friends.controller";
import favoritesCtrl from "./favorites/favorites.controller";
import recentsCtrl from "./recents/recents.controller";


// import RoutesConfig from '../routes';
import NewDynamicService from "../scripts/services/new-dynamic.service";
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
    .load(NewDynamicCtrl)
    .load(RegisterCtrl)
    .load(CalendarFilter)
    .load(ChatNameFilter)
    .load(ChatPictureFilter)
    .load(FriendPictureFilter)
    .load(FriendNameFilter)
    .load(userIdNameFilter)
    .load(userIdPictureFilter)
    .load(getFabulousFilter)
    .load(getCommentsFilter)
    .load(commentNameFilter)
    .load(autographFilter)
    .load(ConfirmationCtrl)
    .load(ProfileCtrl)
    .load(SettingsCtrl)
    .load(FriendsCtrl)
    .load(searchFriendsCtrl)
    .load(favoritesCtrl)
    .load(recentsCtrl)

    .load(InputDirective)
    // .load(RoutesConfig)
    .load(NewDynamicService)
    .load(Routes);

// Startup
if (Meteor.isCordova) {
    Angular.element(document).on("deviceready", onReady);
    console.log('---------------------------------')
    var date = new Date();
 
 
cordova.plugins.notification.local.schedule({
    id: 1,
    title: "Message Title",
    message: "Message Text",
    firstAt: date, // firstAt and at properties must be an IETF-compliant RFC 2822 timestamp
    every: "week", // this also could be minutes i.e. 25 (int)
    sound: "file://sounds/reminder.mp3",
    icon: "http://icons.com/?cal_id=1",
    data: { meetingId:"123#fg8" }
});
} else {
    Angular.element(document).ready(onReady);
}

function onReady() {
    Angular.bootstrap(document, [App]);
    if (Meteor.isCordova) {
        console.log("Printed only in mobile Cordova apps");
      
       
      }
}
