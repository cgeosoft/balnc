# Balnc

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/79c2730e3816489d9a9b10f506cc3ac5)](https://www.codacy.com/manual/xris-georgiou/balnc?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ChristosGeorgiou/balnc&amp;utm_campaign=Badge_Grade)

[![Netlify Status](https://api.netlify.com/api/v1/badges/085594e9-5f2e-4a4c-9dd4-148c0e889869/deploy-status)](https://app.netlify.com/sites/balnc/deploys)

> WARNING: NOT FOR PRODUCTION USE
> This is more of an experiment rather a working product. New and untested libraries are been used. Performance is subject to my mood and no security audit have been performed whatsoever. That been said, welcome to balnc...

![screenshot](docs/assets/screenshot.png)

Balnc (balance) is an free open source business management suite for small companies and freelancers. It is a composition of business modules and also provides tools for extend them and build new ones.

The main philosophy is that no one should be trusted as much as possible. Software should be open sourced and business data (and other) should be owned. If data are not required to be synced the they muat be kept inside and not be delegated to hosting or other providers. Securing ones own local pc is a must and the only job that should be considered. With the rise of distributed systems, distributed apps are the way to go if and only if is this required. 

> Having your customers in one pc? It stays in that pc. Want to share it with your coworkers? Connect to distributed network (ipfs) and transmit it mathematically securely p2p. Don't trust the developers (me)? Open the code and have a look.

## Features

Balnc is an client side offline-first application build with web technologies that can be sync automatically and securely with remote databases.

All features and modules are **running local** at the users machine. This improves speed of loading any part of the app to magnitute similar of the old installable applications.

All data are stored at the client, in a **local database**. It is not require a database server for storing data. As so, privacy is guaranteed and the speed is improved even more.

Although there is this local philosofy, an optional **server** is provided for support sync data over the network. This can been used for backup and support more than one clients that need access to the same data.

Finally the is a desktop app option. This combines client and server in a single installable app that allow to scale in large scale datasets.

## Stack

Main app is build with latest angular version and modules are been splitted in a feature based manner with lazy-load enabled route. Cross module communication is not currently supported.

Data management is heavily backed by rxdb. This node module handles PouchDB database instances and exposes observables. PouchDB, another excellent piece of software, allow to have local database in browser. Depending on the mode of the persistence required memory or indexdb/websql adapter is used.

Data synchronization strategy is subject to the configuration of the app. There are two   flows available.

The first one is to connect to an couch protocol enabled server (couchdb or pouchdb-server).

    client-1 --> rxdb --> pouchdb --> couchdb
    client-2 <-- rxdb <-- pouchdb <------/

This requires maintenance of the server and account management to b handled by the system administrator.

The second strategy is to connect with a server supporting graphql. Balnc server is using this strategy.

    client-1 --> rxdb --> server
    client-2 <-- rxdb <------/

In addition to that server could be sync allowing the desktop app to be synced with others. Experiments with IPFS are made for that matter

    server-1 <--> ipfs <--> server-2

When clients communications is over IPFS you have multiuser, offline first dapp. If you don't want to host a pin service or leave a client online, the consider pay a third party one.

## Modules

| Name          | Status | Description                                                                                         |
| ------------- | -----: | --------------------------------------------------------------------------------------------------- |
| Core          |    90% | Common libraries that are use across all other modules.                                             |
| Projects      |    85% | Manage projects and tasks. Use this with sync and collaborate with others.                          |
| Presentations |    80% | Create presentations for clients. Use this with sync to have them in tablet and TV.                 |
| Boards        |    70% | An internal collaboration tool for communication and sharing files.                                 |
| Business      |    30% | Manage customers, orders, invoices.                                                                 |
| Webpages      |     0% | Create landing pages and simple blogs. Generate static results and use with free hosting providers. |
| Restaurants   |     0% | Manage reservations, table planning.                                                                |

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
cd modules/server
npm install
npm start

# run server with docker
cd modules/server
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
