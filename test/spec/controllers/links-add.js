'use strict';

describe('Controller: LinksAddCtrl', function () {

  // load the controller's module
  beforeEach(module('proagrocorpAdminFrontendApp'));

  var LinksAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LinksAddCtrl = $controller('LinksAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LinksAddCtrl.awesomeThings.length).toBe(3);
  });
});
