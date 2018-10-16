# Balnc Application

## Balnc Client

- A javacript only client.
- Besiness logic run in client
- No server is required (for basic usage)
- All data is stored localy (IndexedDB/WebSQL)
- Data are managed by PouchDB
- In front od PouchDB is RxDB for Observable pattern
- Data could be sync with couchdb-type servers (PouchDB-Server, CouchDB, Balnc-Server)

## Balnc Server

- Build on top of pouchdb-express
- Sync data for backup or centralized network of clients
- View audit log
- Manage users
- Watch data and exec workers (pdf-generator, image-optimisation, db-purge, mock-gen)