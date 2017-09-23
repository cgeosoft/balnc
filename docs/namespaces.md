# Namespaces

The MVC structure is used. Every module should be doing a set of action through components. Services should make the base operations, be accessible from other modules and return public models. Only services may have access to data models.

Models should be data only and not include operations

## Schema
````
balance <namespace>
    [module-name] <namespace>
        models <namespace>
            data <namespace>
                model01 <class>
                    property01 <prop>
                    ...
                ...
            public <namespace>
                >>
        components <namespace>
            component01 <class>
                action01 <function>
                ...
            ...
        services <namespace>
            factories <namespace>
                service01 <class>
                    func01 <function>
                    ...
                ...
            ...
            service01 <class>
                func01 <function>
                ...
            ...
    ...
````

## Example: Core Module
````
balance.core.models.data.setting
    string key
    string value
balance.core.models.public.config
    list<setting> settings
balance.core.models.components.config
    getConfig()
    setConfig()
balance.core.models.services.config
    loadConfiguration()
    saveConfiguration()
````