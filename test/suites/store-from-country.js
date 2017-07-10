const assert = require('chai').assert;

const amazon = require('../../index.js');

describe("storeFromCountry", function() {
  it('should fallback to Amazon.com', function() {
      const store = amazon.store('XX');
      assert.equal(store, "amazon.com");
  });
});
