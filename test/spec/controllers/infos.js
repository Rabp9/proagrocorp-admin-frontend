'use strict';

describe('Controller: InfosCtrl', function () {

  // load the controller's module
  beforeEach(module('proagrocorpAdminFrontendApp'));

  var InfosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InfosCtrl = $controller('InfosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InfosCtrl.awesomeThings.length).toBe(3);
  });
});
