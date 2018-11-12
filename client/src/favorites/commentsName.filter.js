import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Filter } from 'angular-ecmascript/module-helpers';

export default class commentsNameFilter extends Filter {
  filter(id) {
    if (!id) return;

    if (id) {

      let User = Meteor.users.findOne({ _id: id });
      let hasName = User && User.username

      return hasName ? User.username : 'NO NAME';
    }

  }
}

commentsNameFilter.$name = 'commentsName';