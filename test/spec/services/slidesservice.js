'use strict';

describe('Service: slidesService', function () {

  // load the service's module
  beforeEach(module('proagrocorpAdminFrontendApp'));

  // instantiate service
  var slidesService;
  beforeEach(inject(function (_slidesService_) {
    slidesService = _slidesService_;
  }));

  it('should do something', function () {
    expect(!!slidesService).toBe(true);
  });

});
