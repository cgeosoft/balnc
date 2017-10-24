# Balance

**WARNING: This is a non-functional and under development software. If you are interested to be notified of future releases or to help me by any means, please contact me via email.**

![screenshot](modules/main/theme/docs/assets/screenshot.png)

**Balance** is a collection of business modules for managing simple operations of small companies and freelancers.
It includes sales, marketing and accounting tools and it is both open source and free under the MIT license.
In addition it is highly extendable, allowing developers to add new custom modules or upgrade existing ones.

It is builded using web technologies and planned to be delivered within an electron container to supoprt total local offline functionality. However a hosted solution is possible, as it is based in angular and in rxdb.

## Techonogies & libraries

- [Monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) pattern with [lerna](https://github.com/lerna/lerna)
- Modules are distributed through npm
  - Future custom private modules can be delivered with tools like [sinopia](https://www.npmjs.com/package/sinopia)
- All objects are described with [json-schema](http://json-schema.org)
  - [Swagger](https://swagger.io) is used for api design
  - [Faker.js](https://github.com/marak/faker.js) is used for the demo data
- Builded with [Angular](https://angular.io/) and use [Electron](https://electron.atom.io) container for deliver
- For the base theme latest [Bootstrap 4](http://getbootstrap.com/) framework is used

## Main Features

- Offline first using local no-sql [pouchdb](https://pouchdb.com) under [rxdb](https://github.com/pubkey/rxdb)
- Cross platform clients (based in electron for desktop and ionic for mobile)
- Do not require deticated server machine. A common client can be used as a server.
- Low cost and scalable servers (pouchdb-server, couchdb, etc)
- Every module can be extended
- Custom modules can be implemented (menus are extendable)

## Pricing

- Free download (self hosting if needed)
- Support through trained partners
- Chargeable implementation of private custom modules and extensions

## Install Guide [planned]

- Download the application installer from here
- Run the installer to your PC
- After install is complete start the application
- Follow the setup wizard. It will automatically configure the application. Additional files may be required. Wait until the wizard configures your setup and restart
- If you enabled the accounts module your setup credentials will be required.
- If you choose to generate preview demo data you will see them at once. You may reset the dataset from the configuration panel
- Clients that are connected to data network will try to sync. Please refer to data network setup for more information

## Namespaces & Modules

- [Main (2%)](docs/modules/_main.md)
- [Business (0%)](docs/modules/business.md)
- [Payments (0%)](docs/modules/payments.md)
- [Teams (0%)](docs/modules/teams.md)
- [Bookings (0%)](docs/modules/bookings.md)
- [Doctors (0%)](docs/modules/doctors.md)
- [Sports (0%)](docs/modules/sports.md)

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
