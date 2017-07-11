const _stores = exports._stores = require("../data/out/stores.json")
const _countries = exports._stores = require("../data/out/countries.json")

/** https://tools.ietf.org/html/rfc7231#section-5.3.5
    (mostly) language code parser
*/
function preferedLanguage(acceptLanguage) {
  let result = [];
  
  
  const langs = acceptLanguage.split(/,\s*/);
  for(let lang of langs) {
    const parts = lang.match(/^(([a-zA-Z][a-zA-Z])(-.*)?)(\s*;\s*q=(\d+\.\d+|\.\d+|\d+\.|\d+))?$/);
    //                         12                 3      4         5              
    
    if (parts) {
        // iso639 language codes are case insensitive:
        // https://www.loc.gov/standards/iso639-2/faq.html#21
        const lcode=parts[2].toLowerCase();
        const lscore=+parts[5]||1.0;
        result.push({lang: lcode, score: lscore})
    }
  }
  
  result.sort((a,b) => b.score - a.score); // descending order!
  return result;
}

const _products = { D:"D", P:"P", S:"S" };
function storeCountryCodeFromCountryCode(code, options) {
  code = code.toUpperCase();
  const languages = (options && options.lang) || "*";
  const product = (options && _products[options.product]) || "P";
  let country = _countries[code];
  if (!country) // fallback to US
    country = _countries["US"];
  
  const map = country[product];
  for(let pref of preferedLanguage(languages)) {
    const store = map[pref.lang];
    if (store)
      return store;
  }
  
  // fallback to default
  return map["*"];
}

/**
  Possible options:
    ASIN map from store country to ASIN. Default to "*".
 */
function makeUrl(ccode, options) {
  const asin = options.asin[ccode] || options.asin["*"];
  const proto = options.protocol || "https";
  const tag = (options.tag && options.tag[ccode]) || "n";
  
  return proto + "://" + _stores[ccode] + "/dp/" + asin + "/?tag=" + tag; 
}

function countryCode(code, options) {
  if (code.length != 2)
    code = countryCodeFromIP(code);

 return storeCountryCodeFromCountryCode(code, options);
}

exports.store = function(key, options) {
  return _stores[countryCode(key, options)];
}

exports.url = function(key, options) {
  return makeUrl(countryCode(key, options), options);
}
