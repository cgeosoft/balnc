# Core - `@balnc/core`

This is the balnc core module. It should be required from all balnc derivative modules as it contains the core services. From this module start the bootstrap process and it loads all available module. It generates the menus and other services.

## Profiles

Every modules' configuration is stored in a profile. Any client could have an arbitrary number of profiles and switch to anyon at any time. Profiles are aggregations of modules configurations. With this a user could create multiple profiles with different enabled modules or the same with diffirent configurations.

A common use case is having mutiple companies that need management.

### Sample profile

````json
id
name
createdAt
remoteHost
remoteUsername
remotePassword
remoteSync
packages
config
````

## Components

There are several common components that are required in various modules With this components other module can keep a consistent interface. Of course these are optional and could be ignored.

## Database

The whole system is heavily based on top of rxdb module. Every dataset is eventualy stored in PouchDB documents and may be synced accross systems.

Data could be local only without any issue. Optionaly can be synced to remote location (Balnc-Server PouchDB-Server or CouchDB). If local sync is not required an online only use of the remote database could be performed.

PouchDB supports attachement and using this various parts of the app that require using files are implemented with this. A file attachement may be an image for the presentation modules or a pdf for the invoice one.

All docs could easily be dumped and restored from client as a backup strategy or move to other location. Balnc-Server use this for auto-backup mode.

## Themes

A dark or light theme could be enabled for the whole system. In addition accent color could be choosed from a predifined set (material-colors). Custom css could be loaded as-per-profile allowing fine-grained theming.

## Doctor

This is a small module that will perform some pre-designed self check script to validate setting and common errors. Health reports may be submitted through feedback module or exposed through hooks to providers
