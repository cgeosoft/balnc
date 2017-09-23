# Balance

**WARNING: DO NOT USE IN PRODUCTION! This is work in progress.**

Balance is a collection business modules for managing simple operations of small companies.
It includes sales, marketing and accounting tools and it is both open source and free under the MIT license.

It is build with web technologies and delivered with electron container. Moreover, it utilizes a p2p strategy for user-data making it scalable.

## Info

- [Monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) pattern will be used with [lerna](https://github.com/lerna/lerna)
- Modules are distributed through npm network
  - Custom private module can be distributed with tools like [sinopia](https://www.npmjs.com/package/sinopia)
- All objects are described with [json-schema](http://json-schema.org/)
  - [Swagger](https://swagger.io/) is used for api design
  - [Faker.js](https://github.com/marak/faker.js) is used for the demo data
- [TODO: explanation] electron
- [TODO: explanation] angular
- [TODO: explanation] bootstrap 4
- [TODO: explanation] pouchdb / pouchdb-server

## Main Features

- Offline first using local no-sql ([pouchdb](https://pouchdb.com/))
- Cross platform clients (based in electron for desktop and ionic for mobile)
- Do not require server as "server" can also be a client
- Low cost and scalable servers (pouchdb-server, couchdb, etc)
- Every module can be extended
- Custom modules can be implemented (menus are extendable)

## Pricing

- Free download (self hosting if needed)
- (?)Monthly subscription for support tickets
- Chargeable implementation of private custom modules and extensions

## Install Guide

- Download the application installer from here
- Run the installer to your PC
- After install is complete start the application
- Follow the setup wizard. It will automatically configure the application. Additional files may be required. Wait until the wizard configures your setup and restart
- If you enabled the accounts module your setup credentials will be required.
- If you choose to generate preview demo data you will see them at once. You may reset the dataset from the configuration panel
- Clients that are connected to data network will try to sync. Please refer to data network setup for mor information

## Namespaces

- [Main](docs/modules/_main/README.md)
- [Business](docs/modules/business/README.md)
- [Payments](docs/modules/payments/README.md)
- [Teams](docs/modules/teams/README.md)
- [Bookings](docs/modules/bookings/README.md)
- [Doctors](docs/modules/doctors/README.md)
- [Sports](docs/modules/sports/README.md)

## License

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