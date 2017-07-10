const assert = require('chai').assert;

const amazon = require('../../index.js');

describe("urlFromCountry", function() {
  const opts = {
    asin: {
      "*": "ASIN012345",
    }
  };
  
  it('should build well formed URL', function() {
    const url = amazon.url('FR', opts);
    assert.equal(url, "https://www.amazon.fr/dp/ASIN012345/?tag=n");
  });
  
  it('should resolve customer country to a store', function() {
    const url = amazon.url('BE', opts);
    assert.equal(url, "https://www.amazon.fr/dp/ASIN012345/?tag=n");
  });
  
  it('should honnor protocol option', function() {
    const url = amazon.url('FR', {
      asin: opts.asin,
      protocol: "http",
    });
    assert.equal(url, "http://www.amazon.fr/dp/ASIN012345/?tag=n");
  });
  
  it('should use country-specific ASIN', function() {
    const url = amazon.url('BE', {
      asin: {"*":opts.asin["*"], "FR":"OTHER-ASIN"},
      protocol: "http",
    });
    assert.equal(url, "http://www.amazon.fr/dp/OTHER-ASIN/?tag=n");
  });
  
  it('should use default ASIN for other countries', function() {
    const url = amazon.url('GB', {
      asin: {"*":opts.asin["*"], "FR":"OTHER-ASIN"},
      protocol: "http",
    });
    assert.equal(url, "http://www.amazon.co.uk/dp/ASIN012345/?tag=n");
  });

});
