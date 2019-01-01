# Report Server

This a generic report server. It is using CouchDB for real time sync of requested reports. It builds them using plugged data layers and exporting to file like pdf and xlsx. It has an in-memory queue with multithread workers.

## Notes

- The report template document is stored in couchdb. It has the following
  - Sql query: the query is attached as a file. the type is alse included (mssql, mysql)
  - Fields: these are the columns that are return from the repote query
  - Parameters: these are all the parameters of the report. If there is a query, server will resolve it to key-value data
  - Settings: further report setting will be stored, like:
    - Displayed fields
    - Page oriendation (pdf)
    - Dataset order
    - Grouping
- The report template document is synced with couchdb to both clients and server
- If a template is updated from the client, server has to sync in order to work. Out-of-date exception is throughen otherwise
- Server's results are cached by default. Updated data is return if specified
- Reports are always async. Request is saved to couchdb and core sync will eventualy executed. Results will be updated and files will be attached
- Server does not perform any authorization for data. Couchdb per-user may be used.
- If report is marked as an auto-delete the it will deleted after some period of time
- Server performs _purge and _compact in interval

## A simple process

- Client syncs reports templates
- Server syncs report templates
- Client stores a report request in db
- Server syncs report request from db
- Server executes report
- Server generate pdf from results
- Server stores report results and attach pdf in request
- Client syncs report request with the latest update

<div class="page"/>

## Template Example

````json
{
  "_id": "report-01",
  "_ver": "1-000000",
  "title": "Example Report",
  "descriptiom": "This is an example report",
  "query": "basic.mssql",
  "fields":[
    {"name": "field-01", "label": "First Field", "type": "string"},
    {"name": "field-02", "label": "Second Field", "type": "datetime"},
    {"name": "field-03", "label": "Third Field", "type": "number"}
  ],
  "params":[
    {"name": "param-01", "label": "First Param", "type": "single-choice", "query": "param-01.mssql", "data": null},
    {"name": "param-02", "label": "Second Param", "type": "datetime"},
    {"name": "param-03", "label": "Third Param", "type": "number"}
  ],
  "settings":{
    "displayFields":[
      {"name": "field-01", "sort": 1, "group": 1},
      {"name": "field-02", "sort": 2},
      {"name": "field-03"}
    ],
    "pageOrientation": "portrait"
  },
  "_attachments": {
    "basic.mssql": {
      "stub": true,
      "content_type": "application/sql",
      "length": 1544
    },
    "param-01.mssql": {
      "stub": true,
      "content_type": "application/sql",
      "length": 1544
    }
  }
}
````

<div class="page"/>

## Report Example

````json
{
  "_id": "0000-0000000-000000",
  "_ver": "1-000000",
  "report": "report-01",
  "version": "1-000000",
  "status": "COMPLETE",
  "autoDelete": true,
  "requestedAt": "2018-01-01T00:00:00Z",
  "completedAt": "2018-01-01T00:00:00Z",
  "params":[
    {"name": "param-01", "value": "value"},
    {"name": "param-02", "value": "value"},
    {"name": "param-03", "value": "value"}
  ],
  "results":[
    [ "field-01-value", "field-02-value", "field-03-value"],
    [ "field-01-value", "field-02-value", "field-03-value"],
    [ "field-01-value", "field-02-value", "field-03-value"],
    [ "field-01-value", "field-02-value", "field-03-value"],
    [ "field-01-value", "field-02-value", "field-03-value"]
  ],
  "_attachments": {
    "report-01-0000000.pdf": {
      "stub": true,
      "content_type": "application/pdf",
      "length": 15544
    },
    "report-01-0000000.xlsx": {
      "stub": true,
      "content_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "length": 15544
    }
  }
}
````