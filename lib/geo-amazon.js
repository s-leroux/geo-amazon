const _stores = exports._stores = require("../data/out/stores.json")


function storeFromCountry(code, options) {
  const product = (options && options.digital) ? "D" : "P";
  
  let store = _stores[code];
  if (!store) // fallback to US
    store = _stores["US"];
  
  return store[product] || "amazon.com";
}

exports.store = function(key, options) {
  if (key.length == 2) return storeFromCountry(key, options);
  
  return storeFromIP(key, options);
}
