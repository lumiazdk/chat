import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Filter } from 'angular-ecmascript/module-helpers';

export default class FriendNameFilter extends Filter {
  filter(friend) {
    if (!friend) return;

    if (friend.friendId) {

      let otherUser = Meteor.users.findOne({ _id: friend.friendId });
      let hasName = otherUser && otherUser.username

      return hasName ? otherUser.username : 'NO NAME';
    }

  }
}

FriendNameFilter.$name = 'friendName';