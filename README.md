# Balance

**WARNING: This is a non-functional and under development software. If you are interested to be notified of future releases or to help me by any means, please contact me via email.**

![screenshot](docs/assets/screenshot.png)

**Balance** is a collection of business modules for managing simple operations of small companies and freelancers.
It includes sales, marketing and accounting tools and it is both open source and free under the MIT license.
In addition it is highly extendable, allowing developers to add new custom modules or upgrade existing ones.

It is builded using web technologies and planned to be delivered within an electron container for full local offline. However a hosted solution is possible, as it is based in angular and in rxdb.

## Main Features

- Builded with [Angular](https://angular.io/) and use [Electron](https://electron.atom.io) container for deliver
- For the base theme latest [Bootstrap 4](http://getbootstrap.com/) framework is used
- Offline first using local no-sql [pouchdb](https://pouchdb.com) the under the hood tech of [rxdb](https://github.com/pubkey/rxdb)
- Cross platform clients (based in electron for desktop and ionic for mobile)
- Do not require deticated server machine. A common client can be used as a server.
- Low cost and scalable servers (pouchdb-server, couchdb, etc)
- Every module can be extended
- Custom modules can be implemented (menus are extendable)

## License

The MIT License (MIT)

Copyright (c) 2017 Christos Georgiou

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
