// Libs
import 'angular-animate';
import 'angular-meteor';
import 'angular-sanitize';
import 'angular-ui-router';
import 'angular-moment';
import 'ionic-scripts';
import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader';
import InputDirective from '../directives/input.directive';
import { Meteor } from 'meteor/meteor';

// Modules
import ChatsCtrl from '../controllers/chats.controller';
import ChatCtrl from '../controllers/chat.controller';
import CalendarFilter from '../filters/calendar.filter';
import ChatNameFilter from '../filters/chat-name.filter';
import ChatPictureFilter from '../filters/chat-picture.filter';
import LoginCtrl from '../controllers/login.controller';
import ConfirmationCtrl from '../controllers/confirmation.controller';
import ProfileCtrl from '../controllers/profile.controller';
import SettingsCtrl from '../controllers/settings.controller';
import NewChatCtrl from '../controllers/new-chat.controller';
import RegisterCtrl from '../controllers/register.controller';
import FriendsCtrl from '../controllers/friends.controller';
import searchFriendsCtrl from '../controllers/search-friends.controller';



// import RoutesConfig from '../routes';
import NewChatService from '../services/new-chat.service';
import Routes from '../routes';
import 'angular-meteor-auth';
const App = 'Whatsapp';

// App
Angular.module(App, [
    'angular-meteor',
    'angularMoment',
    'angular-meteor.auth',
    'ionic'
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
    .load(ConfirmationCtrl)
    .load(ProfileCtrl)
    .load(SettingsCtrl)
    .load(FriendsCtrl)
    .load(searchFriendsCtrl)
    
    .load(InputDirective)
    // .load(RoutesConfig)
    .load(NewChatService)
    .load(Routes)
    
// Startup
if (Meteor.isCordova) {
    Angular.element(document).on('deviceready', onReady);
}
else {
    Angular.element(document).ready(onReady);
}

function onReady() {
    Angular.bootstrap(document, [App]);
}