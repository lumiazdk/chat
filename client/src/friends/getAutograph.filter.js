import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Filter } from 'angular-ecmascript/module-helpers';

export default class autographFilter extends Filter {
    filter(id) {
        if (!id) return;

        if (id) {

            let User = Meteor.users.findOne({ _id: id });
            let hasName = User && User.profile.autograph

            return hasName ? User.profile.autograph : 'NO NAME';
        }

    }
}

autographFilter.$name = 'autograph';