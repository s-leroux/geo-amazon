const assert = require('chai').assert;

describe("module loading", function() {
  var module;
  it('should load the module', function() {
    module = require('../../index.js');
  });

  it('should export stores', function() {
      assert.property(module, "_stores");
      assert.property(module._stores, "FR");
      assert.property(module._stores["FR"], "D");
      assert.property(module._stores["FR"], "P");
  });
});
