# Main Modules

## Core | `@balance/core`

This is the balance main modules. It should required from all balance modules as it contains the interfaces of which the bootstrap process uses. From this module start the bootstrap process and it loads all available module. It generates the menus and other services. The `core` module will store (in json files) client's settings. It will use plain json if `storage` module is not available and it will sync data upon installation. If `accounts` modules is available, settings can be stored to user profile. Additionally, organization may "enforce" specific settings through defaulting and locking them.

**Key features:**

- dynamic module loader
- setup wizard
- marketplace view
- launcher
- validation handler
- database initialize
- configuration management

## Storage | `@balance/storage`

With this module you can store data to your PC. It supports api for storing both data-sets and binary files. These are stored with pouchdb in local files and may be synced with other installs on the network or pure couchdb servers. Optional you may enable filesystem option in order to store the binary files to a local folders. Using this option will result other synced clients to experience missing files if you have not configure you network correctly. Extended modules are available to provide synced storage with third party cloud servers like aws.

## Themes | `@balance/themes`

This module will manage local themes of the app. Every theme is eventually a set of css files that are used on top of the default one. The theme developer is responsible for proper extending the css classes to alter colors and sizes. Base theme is implemented in sass and various helpers and partials are available for the developer disposal. Custom classes may be implemented only for custom modules. Custom classes for system modules are rare. Themes that are designed for balance will have to expose their configuration preferences if available and respond to api calls to provide pure css. In this way user may alter some theme features. Common cases may be highlight colors, high contrast mode etc. Configuration settings are store to user profile.

## Accounts | `@balance/accounts`

This is the modules for authenticating users and organizations. Running balance without `accounts` module makes it is available to any anonymous user.

    TODO: add encrypt mode

With this module organization entities are provided with setting and information. Users are assigned to user-groups and belong to one or more organizations. User-groups hold authorization setting and use-roles.

## Crons | `@balance/crons`

//

## Dashboards | `@balance/dashboards`

//

## Backup | `@balance/backup`

This is a simple module that offers a simple automated backup of data as also and export mechanism. Data can be dumped to local folder, to network folder or synced third party cloud services like aws:s3. Data may be dumped as json, csv, xml and be available as raw or zipped files. Restoring data is as easy as backup it. Restored data overwrite...

## Notifications | `@balance/notifications` | [More](notifications/README.md)

This module is about notify users and anonymous persons (like customers) with events or job results. It is connected with email, sms and push services to always deliver best.

**Key features:**

- notification groups and settings
- email, sms and push integration with major vendors
- notification editor for planning dynamic events

## Telemetry | `@balance/telemetry`

This module will send anonymous data to vendor private servers. These data-sets are used for further development and improvement of the application.

## Doctor | `@balance/doctor`

This is a small module that will perform some pre-designed self check script to validate setting and common errors. Health reports may be submitted through feedback module or exposed through hooks to providers

## Feedback | `@balance/feedback`

This module is a quick and easy way to receive feedback fro users. It includes a non real time methods like sending email or submitting support tickets and real time methods like chat and video cast.

Every method require extended modules that need to be installed. This one is a mere interface for the underline feature specific module. For example if a vendor would like to offer chat support, will have to require teams-chat module and then enable chat feedback from this module settings.

## Hooks | `@balance/hooks`

Every API call through user action or system job may be transmitted to register server. Every transmission is piped through settings and complicated scenarios can be made.

- send critical error to service that will relay them to SMS provider
- Send every API call to log for better debugging
- Send specific API call to external business intelligence software
- mapper and type validations
- process control and report
