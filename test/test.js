var assert = require('assert');
var _ = require('../index');

describe('ramda-polyfill test', function() {
  describe('Unary function', function() {
    it('Test R.F', function() {
      assert.equal(-1, [1, 2, 3].indexOf(0));
    });
  });
});
