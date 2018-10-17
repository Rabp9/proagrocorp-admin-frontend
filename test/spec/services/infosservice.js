'use strict';

describe('Service: infosService', function () {

  // load the service's module
  beforeEach(module('proagrocorpAdminFrontendApp'));

  // instantiate service
  var infosService;
  beforeEach(inject(function (_infosService_) {
    infosService = _infosService_;
  }));

  it('should do something', function () {
    expect(!!infosService).toBe(true);
  });

});
