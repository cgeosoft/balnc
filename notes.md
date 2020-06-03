# General Notes

<https://www.indiehackers.com/post/indie-hackers-should-5715ac91a6>

User registration
Setup remote
Function database generator

Modules are installed and should generqte database if remote is enabled

Disable remote do notd delete data. Another process should be created

Profile details

- name

Remote Sync

- provider
- account
- unlink
- destroy

Export / Import

## Data table

Data
 Array of obj

Schema
 Propeties
  Label
  Value(item): type
  Sort(items,direction)

Settings stored per page
 SortPropery
 SortDirection
 Page
 Properies
  Key
  IsVisible

Types
 Text(default)
 Doubletext
 Link
 Badge
 Date
 Button

Other functions
 Print
 Download csv

## @balnc/core

Used for all internal providers and shared components.

### Config Provider

- handle configurations
- profiles are group of configurations
- export import but not sync
- manage available modules

### Data Provider

- use rxdb
- sync data
- switch between couch and graphql

### Repository Base Class

- implements basic operations
- extendable from feature repository providers

### Config Component

- base config
- enable modules with config

-

### Login Component

- login.modal
- config.modal
- data
- table
- form
- sidebar
- menu

## @balnc/shell

Contains all components from wrapping all apps.

### providers

- modules
- profiles

### components

- main
- settings
- setup
- login
- marketplace

## @balnc/registry

This has a pouchdb server with only one database to sync available modules metadata. Modules are actually stored in npm repository. This will automatically be updated from npm.

## @balnc/server

This will sync dbs from client. Will support couch protocol on local pouchdb or remote couchdb and graphql on local leveldb or remote

## @balnc/contacts

Invoices
Orders
Offers
Aggreements
Payments
Storage
Messages
Files
Slides
Bookings
Payroll
Campaigns
Loyalty
Merchandising

## General

Explore WebDAV and common sync patterns
File sync with always on client
How to detect file changes from nodejs
How to start server and client from electron process
Dockerize server and client

## Remote and sync

- connection and sync status
- last sync
- sync audit
- sync setting page refactor
- sync options. Couchdb graphql

Sync settings

- user should disable remote
- if remote exist but could not auth then a prompt should be displayed and footer status should show this state. If user ignore this no further interruption should occur
- setup remote should be a wizard with
- if a user choose couch type then he could not enable store credentials as it is a http-only cookie that server set time out
- if user choose graphql then token is store in localstorage or in sessionstorage depending on selection of the store option
- user mayect to create th

## Presentations

- import from pdf, JSON, ppt
