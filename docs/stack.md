# Stack - Heavy development

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