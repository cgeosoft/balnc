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

## contacts

- should generate a new contact only by name
  - it should generate both company and person
  - optional company name, if empty set same company and person name
- overview should display both person and companies. filters should apply
- export overview to pdf
- send contacts to mobile with sms or push notification
- contact preview should display basic details and events

## orders
- new order requires company. an inline new company should be able to generated right into modal
- order items could be added. if state is FINAL an alert should be displayed