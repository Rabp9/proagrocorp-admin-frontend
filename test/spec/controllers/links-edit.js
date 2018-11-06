'use strict';

describe('Controller: LinksEditCtrl', function () {

  // load the controller's module
  beforeEach(module('proagrocorpAdminFrontendApp'));

  var LinksEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LinksEditCtrl = $controller('LinksEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LinksEditCtrl.awesomeThings.length).toBe(3);
  });
});
