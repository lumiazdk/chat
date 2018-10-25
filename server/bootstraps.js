import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Meteor.startup(function() {
    if (Meteor.users.find().count() != 0) return;
    
   
});
