- dashboard
- [plugin:*]
  - sidebar
      - [plugin-menu]
      - ---
      - configuration (manage plugin configuration)
- [plugin:business]
  - sidebar
      - search bar : frame
        - input -> quick search
        - advanced search -> advanced search
      - create contact -> modal
      - latest searches : list
        - search -> view
      - pinned searches : list
        - search -> view
      - opened contacts : list
        - contact -> view
      - ---
      - configuration
- [plugin:projects]
    - overview -> view
    - projects -> view
    - latest tasks : list
      - task -> view
    - ---
    - configuration -> view
- configuration
  - sidebar
      - general settings
        - profile details
      - backup & restore
        - remote database configuration
      - plugin management
        - activate/dactivate
      - ---
      - manage profiles
        - create
        - remove
        - activate
      - help
      - about
  - main
      - {{settings}}


`plugin` is a balnc plugin which includes a collection of functionality
`plugin` has one or `NgModules`

## overview

  - show various metrics about business

## quick-search

  - search for contacts, orders, and invoices
  - support text-shortcuts 
    - regex: `^!?[@#][a-z0-9-:]+$`
    - date-range: `@{{date}}[-{{date-to}}]`
    - flags: `#{{flag}}`

## advanced-search

  - store last X searches
  - save search for later

## contact
  
  - show/manage contact details
  - list orders history
  - create new order

## order

  - show/manage order details
  - show contract details
  - list invoices for this order
  - create new invoice (all or subset of order details)

## invoice

  - show invoice details
  - cancel invoice
  - print invoice (browser print/pdf)
    - user template (html)
  - invoice can not be edit, new one must be issued from order

## configuration

  - manage invoice templates
  - auto publish invoices to pdf
  - upload pdf to cloud provider