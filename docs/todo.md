# TODO

## App

### General

- [ ] Switch back to business menu
- [ ] Rightbar - Docked item, bookmarks, latest
- [ ] Sync workspace
- [ ] Themes light/dark, accent color
- [ ] Larger header in modal
- [ ] Autofocus input in modal
- [ ] Users
  - [ ] Local users
  - [ ] Remote users - login, register
  - [ ] Register in import
- [x] Export workspace as url link - users as members
  - [x] Invite users with this link
- [x] Show db sync status in statusbar
- [x] Refactor workspace config schema
- [x] Better demo data generator
- [x] Manage layout from profile
- [x] Add support page. About faq crisp chat
- [x] Fix couch synchronization
- [x] Bulk insert demo data
- [x] Make base properties indexed
- [x] Provide in root repositories and demo services
- [x] Fire demo generator from profile settings
- [x] Disable lazyload
- [x] refactor setup
  - [x] show intro text only with quick start and import profile
  - [x] quick start generates "default" profile

### Settings

- [ ] Custom remote database
- [x] Remote server should move into intergrations
- [x] Demo data should move into developer
- [x] Remote server should enable option [custom database]
- [x] User avatar
- [x] Stand out in box current profile
- [x] Better integrations

### Customers

- [ ] Events  overview - calendar, list
- [ ] Customer timeline - quick filters by event type
- [ ] Customer management - image, website
- [ ] Customer quick actions - create order, invoice etc
- [ ] Link with stripe
- [ ] Support vCard - import, export, sync with CardDAV
- [ ] Support iCalendar - import, export, sync with CalDAV

### Invoices

- [ ] List all invoices
- [ ] Create and manage invoice - customer is optional
- [ ] Invoice types - draft, open, paid, void, uncollectible
- [ ] Link with stripe
- [ ] Export to pdf
- [ ] Public url
- [ ] Store to files

### Orders

- [ ] List all orders
- [ ] Create and manage order - customer is optional
- [ ] Order can be recurring
- [ ] Order can generate invoice

### Storage

- [ ] Rename to products
- [ ] List all products
- [ ] Create and manage product - customer is optional
- [ ] Product can be goods, services, or ideas
- [ ] Product pricing

### Payments

### Agreements

### Files

- [ ] Handle filetypes
  - [ ] pdf: embed view
  - [ ] md/txt/config/yml/json: inline editor
  - [ ] media: embed
- [ ] sync with external storage
- [ ] Hierarchical view
- [ ] Templates

### Boards

- [ ] Create header view with tabs - bg color of board, tabs Messages, Files, Manage
- [ ] Notifications
- [ ] Video/Audio Call
- [x] Better performance of many messages in timeline
- [x] Last read datetime - board users array - unread counter, user have read inticator, last read placeholder
- [x] Show board path in statusbar
- [ ] Boards Global Settings
  - [ ] Metadata peview - Enable / Disable
  - [ ] Notifications - Enable / Disable
  - [ ] Board order - by name / by last message
  - [x] ~~Messages size - Normal / Compact~~
- [ ] Improve sidebar
  - [ ] Sidebar type: normal/contenced
  - [x] Sidebar with all boards - Add Board, Bookmarked, Boards, Archived
  - [x] Show last message in sidebar if type is normal
- [ ] Board management
  - [ ] Archive boards
  - [ ] Bookmark boards
  - [x] ~~Board picture~~
  - [x] Edit board
  - [x] Board color
  - [x] Topic
  - [x] Intro
  - [x] Delete board
- [ ] Timeline
  - [ ] Edit message
  - [ ] Edit last message with keyboard up
  - [ ] Embed metadata should fetched at message load and be cashed at server
  - [ ] Markdown
  - [ ] Mention user
  - [ ] Quick emoji
  - [ ] Reactions (emoji)
  - [ ] Poll
  - [ ] Embed balnc objects / ex. project's task should create a quick subtask management in timeline
  - [ ] Lazy load and infinite scroll
  - [ ] User profile
  - [ ] Better online users
  - [x] User avatars
  - [x] Message grouping
  - [x] Messages date seperator
  - [x] Time before avatar
  - [x] Delete message
  - [x] Box avatars
  - [x] Improve performance
  - [x] Emojis
  - [x] Giphy
  - [x] Quote message

### Invoices

- [ ] Preview and print
- [ ] Manage templates
- [ ] Create new
- [ ] Create from previous
- [ ] Add customer details from contacts
- [ ] Add items from products
- [ ] Configure own invoice details
- [ ] Notification for upcoming events

## Server

- [ ] Create new private database with owner for new remote requests
- [ ] Enable graphql sync
- [ ] Connect with OrbitDB
- [ ] Enable encryption
- [ ] Stripe intergration
- [ ] Mailgun intergration
- [ ] MailerLite intergration
- [ ] Giphy intergration / cache
- [x] Move old js code to ts
