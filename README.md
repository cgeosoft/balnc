# Balnc

**WARNING: This application is under development. You SHOULD NOT use this for production.**

![screenshot](docs/assets/screenshot.png)

Balnc (balance) is a software framework for develop business applications. It is a base layer of core modules for manageing data and styles and on top are implemented collections of business spesific apps.

Example:

A small business app could use:

- @balnc/core - libraries
- @balnc/main - main views
- @balnc/business - customers, orders, invoices
- @balnc/payments - online payments
- @balnc/email - email client
- @balnc/boards - internal collaboration tool
- @balnc/presentations - create presentations for clients
- @balnc/projects - mnanage tasklists for the team
- @balnc/webpages - mnanage company's landing page

## Main Features

- Builded with [Angular](https://angular.io/) and [rxdb](https://github.com/pubkey/rxdb)
- [PWA](https://developers.google.com/web/progressive-web-apps/) and offline-first
- Low cost and scalable db servers (couchdb, etc)
- Every module can be extended and custom modules can be implemented (menus are extendable)

## License

The MIT License (MIT)