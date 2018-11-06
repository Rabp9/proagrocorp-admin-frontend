'use strict';

describe('Service: linksService', function () {

  // load the service's module
  beforeEach(module('proagrocorpAdminFrontendApp'));

  // instantiate service
  var linksService;
  beforeEach(inject(function (_linksService_) {
    linksService = _linksService_;
  }));

  it('should do something', function () {
    expect(!!linksService).toBe(true);
  });

});
