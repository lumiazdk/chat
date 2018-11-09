import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Filter } from 'angular-ecmascript/module-helpers';

export default class FriendPictureFilter extends Filter {
  filter(friend) {
    if (!friend) return;

    if (friend.friendsId) {
      let otherUser = Meteor.users.findOne({ _id: friend.friendsId })
      let hasPicture = otherUser && otherUser.profile && otherUser.profile.photo;

      return hasPicture ? otherUser.profile.photo : '/user-default.svg';
    }

  };
}

FriendPictureFilter.$name = 'friendPicture';