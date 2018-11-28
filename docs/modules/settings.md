# Main - `@balnc/main`

The `core` module will store (in json files) client's settings. It will use plain json if `storage` module is not available and it will sync data upon installation. If `accounts` modules is available, settings can be stored to user profile. Additionally, organization may "enforce" specific settings through defaulting and locking them.

- dynamic module loader
- setup wizard
- marketplace view
- launcher
- validation handler
- database initialize
- configuration management