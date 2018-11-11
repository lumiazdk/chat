import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Filter } from 'angular-ecmascript/module-helpers';
import { Comments } from "../../../lib/collections";

export default class getCommentsFilter extends Filter {
    filter(dynamicid) {

        if (dynamicid) {

            let newComments = Comments.find({ dynamicid: dynamicid }).fetch();
            console.log(newComments)
            var i=1
            console.log(i++)
            return newComments
        } else {
            return []

        }

    }

}


getCommentsFilter.$name = 'getComments';