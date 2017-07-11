# geo-amazon

A simple tool to find the closest Amazon virtual store
given a customer country.

Location is given either as a country code conforming to
iso3166-alpha2.

[![Build Status](https://travis-ci.org/s-leroux/geo-amazon.png?branch=master)](https://travis-ci.org/s-leroux/geo-amazon)

## Installation

    npm install geo-amazon

## Usage

    const amazon = require('geo-amazon')

    const store = amazon.store('US');
    const store = amazon.store('AU', { product:"D" });
    // Product is either (D)igital, (P)hysical or (S)self-published

    const url = amazon.url('AU', {
      asin:{ '*': ASIN, 'FR': FR_ASIN }
    });
    const url = amazon.url('CH', {
      lang:'fr', asin:{ '*': ASIN, 'FR': FR_ASIN}
    });
    // The prefered langage string is compatible with the
    // http Accept-Language header
    const url = amazon.url('CH', { lang:'fr;q=0.5;de;q=0.9' });

## Node version
Tested with v6.6.0

## Requirements
To build the store and country database, you need gawk 4.x
 
## License 

(The MIT License)

Copyright (c) 2017 [Sylvain Leroux](sylvain@chicoree.fr)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
