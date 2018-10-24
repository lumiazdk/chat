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
import LoginCtrl from '../controllers/login.controller';
import ConfirmationCtrl from '../controllers/confirmation.controller';
import ProfileCtrl from '../controllers/profile.controller';
import SettingsCtrl from '../controllers/settings.controller';
// import RoutesConfig from '../routes';
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
    .load(CalendarFilter)
    .load(ConfirmationCtrl)
    .load(ProfileCtrl)
    .load(SettingsCtrl)
    .load(InputDirective)
    // .load(RoutesConfig)
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