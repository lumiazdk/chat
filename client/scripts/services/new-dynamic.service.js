import { Service } from 'angular-ecmascript/module-helpers';
 
import newDynamicTemplateUrl from '../../src/new-dynamic/new-dynamic.html';
 
export default class NewDynamicService extends Service {
  constructor() {
    super(...arguments);
 
    this.templateUrl = newDynamicTemplateUrl;
  }
 
  showModal() {
    this.scope = this.$rootScope.$new();
 
    this.$ionicModal.fromTemplateUrl(this.templateUrl, {
      scope: this.scope
    })
    .then((modal) => {
      this.modal = modal;
      this.modal.show();
    });
  }
 
  hideModal() {
    this.scope.$destroy();
    this.modal.remove();
  }
}
 
NewDynamicService.$name = 'NewDynamic';
NewDynamicService.$inject = ['$rootScope', '$ionicModal'];