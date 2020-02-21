# Simple Chat

## Web client
- an angular 8 project

### Modules
- main
 - roombar
- room-create
- room
 - message
- settings
- user
- users
- login

## Commons
- an angular 8 library
- models
  - message
  - room
  - user
  - team

## Mobile client
- an ionic 4 project

## Api
- a nodejs project with expressjs
  - crud teams
  - crud users
  - crud members of teams
  - crud rooms of a team
  - crud messages of a room
  - get server stats
- db storage based on ???
- use `bull` for queue, based on redis

## Socket
- a nodejs project with socket.io
- proxy api requests

## Worker
- a nodejs project with to handle jobs from queue
- bull handlers
- env configure of the activated handlers

## Infrastructure services
- redis
- rethinkdbure services
- redis
-  rethinkdbure services
- redis
- 