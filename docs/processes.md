# Processes

## User Registration

- user navigates to /register
- user input email and password and click "ok"
- user receives email with verification code that navigates to /verify
- user navigate to /login
- user syncs /db/userkey
- if has valid invite-token:
  - system generate user-dbs in format `[company]-[user]-[module]` and assign user as user
  - setup admin-migration plan betwin `[company]-default-[module]` and `[company]-[user]-[module]`
- check no-companies
  - if has none: navigate to /companies to create a new company
  - if has only one or more: select last-visit/first-in-list and navigate to /dashboard

## Company Create

- user navigates to /companies
- create a new company and apply required modules
- system generate company-dbs in format `[company]-default-[module]` and assign user as admin
- system generate user-dbs in format `[company]-[user]-[module]` and assign user as admin
- setup admin-migration plan betwin `[company]-default-[module]` and `[company]-[user]-[module]`

## Invite to join

- user navigates to specific company management /companies/manage?k=q1w2e3
- user click "invite" and input email
- system check and send an invitation email to new-user
- check if user exist
  - if yes: send a join-team email, asking to login and accept invite
  - if no: send a register-and-join email


## Query Report process
- start screen
- ‎add remote
- ‎select file
- ‎upload file to local storage
- ‎load reports module
- ‎load queries module
- ‎decrypt queries using profile
- ‎select query from list
- ‎add query params
- ‎submit query to local server
- ‎render results to view
- ‎export results to pdf/excel


## Login and switching
- start add local profile
- ‎setup user
- ‎do job
- ‎add remote profile from file
- ‎switch profile
- ‎type username password
- ‎do job
- ‎logoff
- ‎load remote profile
- ‎type other username password
- ‎do job

