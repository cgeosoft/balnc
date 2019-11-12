# Balnc

**WARNING: UNDER DEVELOPMENT AND NOT READY FOR PRODUCTION USE**

![screenshot](docs/assets/screenshot.png)

Balnc (balance) is an free open source business management suite for small companies and freelancers. It is included a collection of business modules and also provides the tools for extend them or build new ones.

## Main Features

Balnc is an client side offline-first application build with web technologies that can be sync automaticaly securely with remote database.

All features and modules are **running local** at the users machine. This improves speed of loading any part of the app to magnitute similar of the old buisness installable applications.

Even the data of the app is stored at the client, in a **local database**. It is not require a database server for storing data. As so, data are store at the user's machine and are not visible to any third parties and the speed is improved even more.

Although it is build with this local philosofy, there is **balnc-server** for support sync data over the network. This can been used for backup and support more than one clients need access to the same data.

## Modules

| Name          |  Req  | Status | Description                                                                                         |
| ------------- | :---: | -----: | --------------------------------------------------------------------------------------------------- |
| Core          |  Yes  |    90% | Common libraries that are use across all other modules.                                             |
| Projects      |  No   |    85% | Manage projects and tasks. Use this with sync and collaborate with others.                          |
| Presentations |  No   |    80% | Create presentations for clients. Use this with sync to have them in tablet and TV.                 |
| Boards        |  No   |    70% | An internal collaboration tool for communication and sharing files.                                 |
| Business      |  No   |    30% | Manage customers, orders, invoices.                                                                 |
| Webpages      |  No   |     0% | Create landing pages and simple blogs. Generate static results and use with free hosting providers. |
| Restaurants   |  No   |     0% | Manage reservations, table planning.                                                                |

## Try It

You may use the latest stable version at [https://balnc.cgeosoft.com](https://balnc.cgeosoft.com)

If you want to try it local:

```bash
# clone the repo
git clone https://github.com/ChristosGeorgiou/balnc
cd balnc

# run client
npm install
npm start

# run server with nodejs
cd balnc/server
npm install
npm start

# run server with docker
cd balnc/server
docker-compose up -d
```

## Technologies

- Builded with [Angular](https://angular.io/) and [rxdb](https://github.com/pubkey/rxdb)
- [PWA](https://developers.google.com/web/progressive-web-apps/) and offline-first
- Low cost and scalable db servers with couchdb protocol

## Donate

This is a side project and more an experiment rather than a product. If you are that awesome person that want to donate, please keep in mind that I work on this on my free time and it will not be ready probably in the next 600 years.

[<img src="http://img.shields.io/liberapay/receives/cgeosoft.svg?logo=liberapay">](https://liberapay.com/cgeosoft/donate)

## License

The MIT License (MIT)
