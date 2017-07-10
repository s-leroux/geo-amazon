const assert = require('chai').assert;

const amazon = require('../../index.js');

describe("storeFromCountry", function() {
  it('should fallback to Amazon.com', function() {
    const store = amazon.store('XX');
    assert.equal(store, "amazon.com");
  });
  
  it('should distinguish between physical and digital products', function() {
    // Currently Amazon.nl only deliver digital products
    const store1 = amazon.store('NL', {digital: false});
    const store2 = amazon.store('NL', {digital: true});
    
    assert.notEqual(store1, "amazon.nl");
    assert.equal(store2, "amazon.nl");
  });
  
  it('should use local store if available', function() {
    const stores = {
      FR: "amazon.fr",
      US: "amazon.com",
      GB: "amazon.co.uk", // XXX in iso3166 United Kingdom is GB, not UK!
      DE: "amazon.de",
      IT: "amazon.it",
      IN: "amazon.in",
      CN: "amazon.cn",
      JP: "amazon.co.jp",
      // NL: "amazon.nl", // digital only
      ES: "amazon.es",
      CA: "amazon.ca",
      MX: "amazon.com.mx",
      // AU: "amazon.com.au", // digital only
      BR: "amazon.com.br",
    };
    
    for(let key of Object.keys(stores)) {
      const store1 = amazon.store(key, {digital: false});
      const store2 = amazon.store(key, {digital: true});

      assert.equal(store1, stores[key], "Wrong store for "+key+" (physical)");
      assert.equal(store2, stores[key], "Wrong store for "+key+" (digital)");
    }
  });
});
