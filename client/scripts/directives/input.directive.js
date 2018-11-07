import { Directive } from 'angular-ecmascript/module-helpers';

export default class InputDirective extends Directive {
  constructor() {
    super(...arguments);

    this.restrict = 'E';

    this.scope = {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&',
      'file': '='
    };
  }

  link(scope, element) {
    element.bind('focus', (e) => {
      if (!scope.onFocus) return;

      this.$timeout(() => {
        scope.onFocus();
      });
    });

    element.bind('blur', (e) => {
      if (!scope.onBlur) return;

      this.$timeout(() => {
        scope.onBlur();
      });
    });

    element.bind('keydown', (e) => {
      if (e.which != 13) return;

      if (scope.returnClose) {
        element[0].blur();
      }

      if (scope.onReturn) {
        this.$timeout(() => {
          scope.onReturn();
        });
      }
    });
    element.bind('change', function (event) {
      let file = event.target.files;
      scope.file = file ? file : undefined;
      scope.$apply();
    });

  }
}

InputDirective.$name = 'input';
InputDirective.$inject = ['$timeout'];