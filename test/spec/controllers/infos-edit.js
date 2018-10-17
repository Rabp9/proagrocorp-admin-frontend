'use strict';

describe('Controller: InfosEditCtrl', function () {

  // load the controller's module
  beforeEach(module('proagrocorpAdminFrontendApp'));

  var InfosEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InfosEditCtrl = $controller('InfosEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InfosEditCtrl.awesomeThings.length).toBe(3);
  });
});
