import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Filter } from 'angular-ecmascript/module-helpers';

export default class userIdNameFilter extends Filter {
  filter(user) {
    if (!user) return;

    if (user.userId) {

      let User = Meteor.users.findOne({ _id: user.userId });
      let hasName = User && User.username

      return hasName ? User.username : 'NO NAME';
    }

  }
}

userIdNameFilter.$name = 'userIdName';