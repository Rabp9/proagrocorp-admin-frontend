'use strict';

describe('Service: oAuthHttpInterceptor', function () {

  // load the service's module
  beforeEach(module('proagrocorpAdminFrontendApp'));

  // instantiate service
  var oAuthHttpInterceptor;
  beforeEach(inject(function (_oAuthHttpInterceptor_) {
    oAuthHttpInterceptor = _oAuthHttpInterceptor_;
  }));

  it('should do something', function () {
    expect(!!oAuthHttpInterceptor).toBe(true);
  });

});
