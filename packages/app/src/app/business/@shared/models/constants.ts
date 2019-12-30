export const MENU = {
  items: [
    {
      label: 'Overview',
      type: 'PAGE',
      icon: 'border-all'
    },
    {
      label: 'Calendar',
      type: 'PAGE',
      icon: 'calendar-alt'
    },
    {
      type: 'DIVIDER'
    },
    {
      label: 'Contacts',
      type: 'PAGE',
      icon: 'users',
      url: '/business/contacts'
    },
    {
      label: 'Agreements',
      type: 'PAGE',
      icon: 'signature',
      url: '/business/agreements'
    },
    {
      label: 'Orders',
      type: 'PAGE',
      icon: 'shopping-cart',
      url: '/business/orders'
    },
    {
      label: 'Invoices',
      type: 'PAGE',
      icon: 'file-invoice-dollar',
      url: '/business/invoices'
    },
    {
      label: 'Payments',
      type: 'PAGE',
      icon: 'money-check',
      url: '/business/payments',
      items: [
        {
          label: 'Transactions',
          type: 'PAGE',
          icon: 'exchange-alt',
          url: '/business/payments/transactions'
        },
        {
          label: 'Accounts',
          type: 'PAGE',
          icon: 'piggy-bank',
          url: '/business/payments/accounts'
        }
      ]
    },
    {
      label: 'Storage',
      type: 'PAGE',
      icon: 'warehouse',
      url: '/business/storage'
    },
    {
      type: 'DIVIDER'
    },
    {
      label: 'Settings',
      type: 'PAGE',
      icon: 'cog',
      url: '/business/settings'
    }
  ]
}
