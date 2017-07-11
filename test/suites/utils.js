const assert = require('chai').assert;
const rewire = require('rewire');

const lib = rewire('../../lib/geo-amazon.js');

describe("preferedLanguage", function() {
  const preferedLanguage = lib.__get__("preferedLanguage");
  
  it('should properly parse languages', function() {
    const expected = [{lang: "en", score: 1.0 }];
    
    assert.deepEqual(preferedLanguage("en"), expected);
    assert.deepEqual(preferedLanguage("en;q=1.0"), expected);
    assert.deepEqual(preferedLanguage("en-US;q=1.0"), expected);
    assert.deepEqual(preferedLanguage("en-US"), expected);
    assert.deepEqual(preferedLanguage("en-US_TX"), expected);
    assert.deepEqual(preferedLanguage("en-US_TX;q=1.0"), expected);
  });
  
  it('should ignore language case', function() {
    // https://www.loc.gov/standards/iso639-2/faq.html#21
    const expected = [{lang: "en", score: 1.0 }];
    
    assert.deepEqual(preferedLanguage("EN"), expected);
    assert.deepEqual(preferedLanguage("En;q=1.0"), expected);
  });
  
  it('should sort langages in descending order', function() {
    const expected = [{ lang: "en", score: 1.0 }, { lang: "fr", score:0.5 }];
    
    assert.deepEqual(preferedLanguage("en, fr;q=.5"), expected);
    assert.deepEqual(preferedLanguage("en;q=1, fr;q=.5"), expected);
    assert.deepEqual(preferedLanguage("fr;q=.5, en"), expected);
    assert.deepEqual(preferedLanguage("fr;q=.5, en;q=1"), expected);
    
    
    assert.deepEqual(preferedLanguage("fr;q=0.9,it;q=1.0"), [
      { lang: "it", score: 1.0 },
      { lang: "fr", score: 0.9 },
    ]);

  });
  
  it('should discard *', function() {
    assert.deepEqual(preferedLanguage("*"), []);
    assert.deepEqual(preferedLanguage("en,*"), [{lang: "en", score: 1.0 }]);
  });

});
