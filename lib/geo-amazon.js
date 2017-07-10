const _stores = exports._stores = require("../data/out/stores.json")
const _countries = exports._stores = require("../data/out/countries.json")


function storeCountryCodeFromCountryCode(code, options) {
  code = code.toUpperCase();
  const lang = (options && options.lang || "*").toLowerCase().substr(0,2);
  const product = (options && options.digital) ? "D" : "P";
  let country = _countries[code];
  if (!country) // fallback to US
    country = _countries["US"];
  
  return country[product][lang] || country[product]["*"];
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
