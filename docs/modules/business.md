# Business Modules

## Contacts | `@balance/business-contacts`

This module is for keeping lists of persons and companies. If you installed this one alone you would have a rather sophisticated phone-book. On the other hand it may be the core of your business as It hold your customer data. Keep in mind that a person is not a customer, but the latest is a label we should give to ether a company or a person after the first order is made.

The module have a extended internal mechanism to hold simple data. Common fields are implemented but the final user may extend easily the schema dropping more fields. The abstract overview of this module has only persons and companies (groups of persons). Every person may belong to more than one company using a description (job) and of course companies hold more than one person. In addition companies may hold other companies, allowing group of companies to be registered.

## Orders | `@balance/business-orders`

Using this module you may create the core part of your business. It includes list of products or services and orders. If `business-contacts` module is installed, specific order filed may be pre-filled.

Orders can hold progress tags like pre-order, deal etc. Sales funnels can be created in this way.

## Invoices | `@balance/business-invoices`

This module extends `business-orders` to implement invoices both as data and generated pdf file. Outgoing invoices are straight forward procedure and may be a derivative of orders. Incoming invoices can be parsed with OCR and stored with their meta data. Aggregation functions and presented view give extended analytics and tax reports.

**Key features:**

- automated pdf invoice generator with extendable templates
- convert orders to invoices
- import incoming invoices with meta data using OCR
- extendable reports with averages, sums and country specific for tax needs

## Eshop | `@balance/business-eshop`

## Marketing Modules

## Analytics | `@balance/marketing-analytics`

## Polls | `@balance/marketing-polls`

## Presentations | `@balance/marketing-presentations`

## Emails | `@balance/marketing-emails`
