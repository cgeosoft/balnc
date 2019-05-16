# Business

## Contacts

- Group of persons like companies, teams and organisations
- Persons with contact details
- Link with offers, orders and invoices
- should generate a new contact only by name
  - it should generate both company and person
  - optional company name, if empty set same company and person name
- overview should display both person and companies. filters should apply
- export overview to pdf
- send contacts to mobile with sms or push notification
- contact preview should display basic details and events

## Offers

- Revisions
- Templates
- Presentations
- Import export pdf
- Present to link

## Orders

Using this module you may create the core part of your business. It includes list of products or services and orders. If `business-contacts` module is installed, specific order filed may be pre-filled.

Orders can hold progress tags like pre-order, deal etc. Sales funnels can be created in this way.

- Real time status tracking
- Link contacts and products
- new order requires company. an inline new company should be able to generated right into modal
- order items could be added. if state is FINAL an alert should be displayed

## Invoices

This module extends `business-orders` to implement invoices both as data and generated pdf file. Outgoing invoices are straight forward procedure and may be a derivative of orders. Incoming invoices can be parsed with OCR and stored with their meta data. Aggregation functions and presented view give extended analytics and tax reports..

- automated pdf invoice generator with extendable templates
- convert orders to invoices
- import incoming invoices with meta data using OCR
- extendable reports with averages, sums and country specific for tax needs
- Pdf generator
- Sharable link
- Payment gateway link
- Payment tracking
- [ ] remove search
- [ ] implements invoice sync
- [ ] implements filters

## Payments - `@balnc/payments`

- Stripe
- Paypal
- AlphaBank