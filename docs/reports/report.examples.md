# Reports Examples

Example document report

```` json
[{
  "name": "Customers Report",
  "fields": {
    "code": {
      "label": "Code",
      "size": "*"
    },
    "name": {
      "label": "Name",
      "size": "*"
    },
    "address": {
      "label": "Address",
      "size": "*"
    },
    "phone": {
      "label": "Phone",
      "size": "*"
    }
  },
  "params":{
    "status":{
      "label":"Status",
      "operations":["$eq"],
      "items":["ACTIVE","INACTIVE"],
    },
    "dateInserted":{
      "type":"dateTime",
      "operations":["$goe"],
      "items":["ACTIVE","INACTIVE"],
    },
  },
  "queries": {
    "collections": {
      "customersDB": {
        "fields": [
            {"name": "married", "type": "boolean"},
            {"name": "lastname", "type": "string"},
            {"name": "year-of-birth", "type": "number"}
        ],
        "selector": {
          "status": {
            "$eq": "$status"
          }
        },
        "sort": ["name"]
      }
    }
  }
}]
````