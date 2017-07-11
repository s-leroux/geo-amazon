const assert = require('chai').assert;

const amazon = require('../../index.js');

describe("storeFromCountry", function() {
  it('should fallback to Amazon.com', function() {
    const store = amazon.store('XX');
    assert.equal(store, "www.amazon.com");
  });
  
  it('should distinguish between physical and digital products', function() {
    // Currently Amazon.nl only deliver digital products
    const store1 = amazon.store('NL', {product:"P"});
    const store2 = amazon.store('NL', {product:"D"});
    
    assert.notEqual(store1, "www.amazon.nl");
    assert.equal(store2, "www.amazon.nl");
  });
  
  it('should use local store if available', function() {
    const stores = {
      FR: "www.amazon.fr",
      US: "www.amazon.com",
      GB: "www.amazon.co.uk", // XXX in iso3166 United Kingdom is GB, not UK!
      DE: "www.amazon.de",
      IT: "www.amazon.it",
      IN: "www.amazon.in",
      CN: "www.amazon.cn",
      JP: "www.amazon.co.jp",
      // NL: "www.amazon.nl", // digital only
      ES: "www.amazon.es",
      CA: "www.amazon.ca",
      MX: "www.amazon.com.mx",
      // AU: "www.amazon.com.au", // digital only
      BR: "www.amazon.com.br",
    };
    
    for(let key of Object.keys(stores)) {
      const store1 = amazon.store(key, {product:"P"});
      const store2 = amazon.store(key, {product:"D"});

      assert.equal(store1, stores[key], "Wrong store for "+key+" (physical)");
      assert.equal(store2, stores[key], "Wrong store for "+key+" (digital)");
    }
  });
  
  it('should honnor language code', function() {
    assert.equal(amazon.store('CH', {lang: "it"}), "www.amazon.it");
    assert.equal(amazon.store('CH', {lang: "fr"}), "www.amazon.fr");
    assert.equal(amazon.store('CH', {lang: "de"}), "www.amazon.de");
    assert.equal(amazon.store('CH', {lang: "en"}), "www.amazon.de");
  });
  
  it('should choose prefered language when available', function() {
    assert.equal(amazon.store('CH', {lang: "it;q=1.0,fr;q=0.9"}), "www.amazon.it");
    assert.equal(amazon.store('CH', {lang: "fr;q=0.9,it;q=1.0"}), "www.amazon.it");
  });
  
  it('should parse language code', function() {
    assert.equal(amazon.store('CH', {lang: "fr-FR_BE"}), "www.amazon.fr");
  });

});
