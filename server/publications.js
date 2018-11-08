import { Meteor } from "meteor/meteor";
import { Chats, Messages, Friends, AddMessage } from "../lib/collections";
Meteor.publish("Friends", function () {
    return Friends.find({}, {
        userId: 1,
        friendId: 1,
    });
});
Meteor.publish("AddMessage", function () {
    return AddMessage.find(
        {},
        {
            fields: {
                userId: 1,
                friendId: 1,
                userData: 1,
                friendData: 1,
                status: 1,
                selfDelete: 1,
                friendDelete: 1
            }
        }
    );
});
Meteor.publish("users", function () {
    return Meteor.users.find(
        {},
        { fields: { profile: 1, emails: 1, username: 1 } }
    );
});

Meteor.publishComposite("chats", function () {
    if (!this.userId) return;

    return {
        find() {
            return Chats.find({ userIds: this.userId });
        },
        children: [
            {
                find(chat) {
                    return Messages.find({ chatId: chat._id });
                }
            },
            {
                find(chat) {
                    const query = { _id: { $in: chat.userIds } };
                    const options = { fields: { profile: 1, emails: 1, username: 1 } };

                    return Meteor.users.find(query, options);
                }
            }
        ]
    };
});
