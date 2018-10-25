import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Meteor.startup(function() {
    if (Meteor.users.find().count() != 0) return;
    console.log(Meteor.users.find().count());
    Accounts.createUserWithPhone({
        phone: "+972501234567",
        profile: {
            name: "轻舞飞扬"
        }
    });

    Accounts.createUserWithPhone({
        phone: "+972501234568",
        profile: {
            name: "若要爱,请深爱"
        }
    });

    Accounts.createUserWithPhone({
        phone: "+972501234569",
        profile: {
            name: "裤头哥"
        }
    });
});
