import { _ } from "meteor/underscore";
import { Meteor } from "meteor/meteor";
import { Config, Runner } from "angular-ecmascript/module-helpers";
import chatsTemplateUrl from "./chats/chats.html";
import chatTemplateUrl from "./chat/chat.html";
import tabsTemplateUrl from "./tabs/tabs.html";
import confirmationTemplateUrl from "./confirmation/confirmation.html";
import loginTemplateUrl from "./login/login.html";
import registerTemplateUrl from "./register/register.html";
import profileTemplateUrl from "./profile/profile.html";
import settingsTemplateUrl from "./settings/settings.html";
import friendsTemplateUrl from "./friends/friends.html";
import searchFriendsTemplateUrl from "./search-friends/search-friends.html";
import favoritesTemplateUrl from "./favorites/favorites.html";
import recentsTemplateUrl from "./recents/recents.html";
Router.configure({
    noRoutesTemplate: 'ReplacesSplashScreen'
  });
class RoutesConfig extends Config {
    constructor() {
        super(...arguments);

        this.isAuthorized = ["$auth", this.isAuthorized.bind(this)];
    }
    configure() {
        this.$stateProvider
            .state("tab", {
                url: "/tab",
                abstract: true,
                templateUrl: tabsTemplateUrl,
                resolve: {
                    user: this.isAuthorized,
                    chats() {
                        return Meteor.subscribe("chats");
                    }
                }
            })
            .state("tab.chats", {
                url: "/chats",
                views: {
                    "tab-chats": {
                        templateUrl: chatsTemplateUrl,
                        controller: "ChatsCtrl as chats"
                    }
                }
            })
            .state("tab.favorites", {
                url: "/favorites",
                views: {
                    "tab-favorites": {
                        templateUrl: favoritesTemplateUrl,
                        controller: "favoritesCtrl as favorites"
                    }
                }
            })
            .state("tab.recents", {
                url: "/recents",
                views: {
                    "tab-recents": {
                        templateUrl: recentsTemplateUrl,
                        controller: "recentsCtrl as recents"
                    }
                }
            })
            .state("tab.friends", {
                url: "/friends",
                views: {
                    "tab-friends": {
                        templateUrl: friendsTemplateUrl,
                        controller: "friendsCtrl as friends"
                    }
                }
            })
            .state("tab.chat", {
                url: "/chats/:chatId",
                views: {
                    "tab-chats": {
                        templateUrl: chatTemplateUrl,
                        controller: "ChatCtrl as chat"
                    }
                }
            })
            .state("login", {
                url: "/login",
                templateUrl: loginTemplateUrl,
                controller: "LoginCtrl as logger"
            })
            .state("register", {
                url: "/register",
                templateUrl: registerTemplateUrl,
                controller: "RegisterCtrl as register"
            })
            .state("confirmation", {
                url: "/confirmation/:phone",
                templateUrl: confirmationTemplateUrl,
                controller: "ConfirmationCtrl as confirmation"
            })
            .state("profile", {
                url: "/profile",
                templateUrl: profileTemplateUrl,
                controller: "ProfileCtrl as profile",
                resolve: {
                    user: this.isAuthorized
                }
            })
            .state("tab.settings", {
                url: "/settings",
                views: {
                    "tab-settings": {
                        templateUrl: settingsTemplateUrl,
                        controller: "SettingsCtrl as settings"
                    }
                }
            })
            .state("tab.searchFriends", {
                url: "/friends/searchFriends",

                views: {
                    "tab-friends": {
                        templateUrl: searchFriendsTemplateUrl,
                        controller: "searchFriendsCtrl as searchFriends"
                    }
                }
            });
        this.$urlRouterProvider.otherwise("tab/favorites");
        this.$locationProvider.html5Mode(true);
    }
    isAuthorized($auth) {
        return $auth.awaitUser();
    }
}

RoutesConfig.$inject = [
    "$stateProvider",
    "$urlRouterProvider",
    "$locationProvider"
];
class RoutesRunner extends Runner {
    run() {
        this.$rootScope.$on("$stateChangeError", (...args) => {
            const err = _.last(args);
            if (err === "AUTH_REQUIRED" && !Meteor.userId()) {
                this.$state.go("login");
            }
        });
    }
}

RoutesRunner.$inject = ["$rootScope", "$state"];

export default [RoutesConfig, RoutesRunner];
