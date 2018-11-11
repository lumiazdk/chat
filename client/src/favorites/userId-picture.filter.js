import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Filter } from 'angular-ecmascript/module-helpers';

export default class userIdPictureFilter extends Filter {
  filter(user) {
    if (!user) return;

    if (user.userId) {
      let User = Meteor.users.findOne({ _id: user.userId })
      let hasPicture = User && User.profile && User.profile.photo;

      return hasPicture ? User.profile.photo : '/user-default.svg';
    }

  };
}

userIdPictureFilter.$name = 'userIdPicture';