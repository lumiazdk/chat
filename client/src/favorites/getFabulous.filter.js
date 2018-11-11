import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Filter } from 'angular-ecmascript/module-helpers';
import { Fabulous } from "../../../lib/collections";

export default class getFabulousFilter extends Filter {
  filter(dynamicid) {
    if (!dynamicid) return;

    if (dynamicid) {

      let newFabulous = Fabulous.findOne({ dynamicid: dynamicid });
      if(newFabulous){
        var all = Meteor.users.find({ '_id': { $in: newFabulous.fabulouspeople } });
        var arr=[]
        all.forEach(item => {
          arr.push(item.username)
        });
        return arr.toString();
      }
      
    }

  }
}

getFabulousFilter.$name = 'getFabulous';