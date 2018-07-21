// import * as _modules from '../../../modules/modules.json'
import * as _package from '../../package.json'

export const environment: any = {
  isProd: false,
  modules: [{
    "id": "@balnc/business",
    "title": "Business",
    "description": "In this namespace you will find business modules that will help you manage your customers, orders and profiles.",
    "menu": [{
      "id": "contacts",
      "label": "Contacts",
      "icon": "users",
      "path": "/business/contacts"
    }, {
      "id": "orders",
      "label": "Orders",
      "icon": "shopping-cart",
      "path": "/business/orders"
    }, {
      "id": "invoices",
      "label": "Invoices",
      "icon": "copy:regular",
      "path": "/business/invoice"
    }],
    "config": null
  }, {
    "id": "@balnc/marketing",
    "title": "Marketing",
    "description": "It includes module for your marketing team. Use for set presentations, email campaings and view analytics.",
    "menu": [{
      "id": "presentations",
      "label": "Presentations",
      "icon": "desktop",
      "path": "/presentations"
    }, {
      "id": "analytics",
      "label": "analytics",
      "icon": "desktop",
      "path": "/analytics"
    }, {
      "id": "polls",
      "label": "polls",
      "icon": "desktop",
      "path": "/polls"
    }, {
      "id": "emails",
      "label": "emails",
      "icon": "desktop",
      "path": "/emails"
    }],
    "config": null
  }, {
    "id": "@balnc/teams",
    "title": "Teams",
    "description": "A set of modules for easy team managements. It includes a chat systems, projects and task management.",
    "menu": [{
      "id": "projects",
      "label": "Projects",
      "icon": "cubes",
      "path": "/projects"
    }, {
      "id": "boards",
      "label": "Message Boards",
      "icon": "comments:regular",
      "path": "/boards"
    }],
    "config": null
  }, {
    "id": "@balnc/report",
    "title": "Reports",
    "description": "A simple but full-feature team chat with customizable rooms",
    "menu": [{
      "id": "reports",
      "label": "Reports",
      "icon": "file-alt:regular",
      "path": "/report"
    }],
    "config": {
      "server": {
        "requireUser": {
          "type": "boolean"
        },
        "host": {
          "type": "string"
        }
      }
    }
  }],
  version: _package["version"],
}

export default environment
