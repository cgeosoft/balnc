# Data Upgrade Strategy

For every item stored a pair of schema/data is used. Every schema must have a version through the $id property and all schemas must preserved for backward compatibility. Data items must state the schema that they comply.

Given that lets say that we have a data-object stored in version 1.5

````json
{
    "schema": {
        "target": "business/orders/customer",
        "version": "1.5",
    },
    "id": 123456789,
    "name": "Lorem Ipsum"
}
````

If the `@balance/business-orders` modules is upgraded to version 1.6 an incompatibility may be presented. Let's say that the `name` property is converted from `type: string` to `type: object` and it contains `first` and `last` properties.

The next data object should be:

````json
{
    "schema": {
        "target": "business/orders/customer",
        "version": "1.6",
    },
    "id": 123456789,
    "name": {
        "first": "Lorem",
        "last": "Ipsum"
    }
}
````

For that to be as easy as possible a migration strategy must be included in every release and user must approve the conversion. In given example the migration function could be

````js
function migrationUp(oldDataObject){
    let splitName = oldDataObject.name.split();
    this.name.first = splitName[0];
    this.name.last = splitName.shift().join(" ");
}
function migrationDown(oldDataObject){
    this.name.first = oldDataObject.name.first + " " +oldDataObject.name.last;
}
````

Chain migrations should be possible and thus going from version 1.5 to 1.7, two migrations will be executed in sequence.