'use strict';

describe('Controller: SlidesAddCtrl', function () {

  // load the controller's module
  beforeEach(module('proagrocorpAdminFrontendApp'));

  var SlidesAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SlidesAddCtrl = $controller('SlidesAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SlidesAddCtrl.awesomeThings.length).toBe(3);
  });
});
