# geo-amazon

A simple tool to find the closest Amazon virtual store
for a given location.

Location can be given either as a country code, or retrived
from an IP address using GeoIP.

[![Build Status](https://travis-ci.org/s-leroux/geo-amazon.png?branch=master)](https://travis-ci.org/s-leroux/geo-amazon)

## Installation

    npm install geo-amazon

## Usage

    const amazon = require('geo-amazon')

    const store = amazon.store('US');
    const store = amazon.store('8.8.8.8');
    const store = amazon.store('AU', { digital: true});

    const url = amazon.url('AU', { '*':ASIN, 'FR':FR_ASIN}, {'FR': AFFILIATE})

## Node version
Tested with v6.6.0
 
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
