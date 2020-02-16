import { MenuItem } from '@balnc/shared'

export const BUSINESS_SIDEBAR_MENU: MenuItem[] = [
  {
    label: 'Overview',
    type: 'button',
    icon: 'border-all'
  },
  {
    label: 'Calendar',
    type: 'button',
    icon: 'calendar-alt'
  },
  {
    type: 'divider'
  },
  {
    label: 'Contacts',
    type: 'button',
    icon: 'users',
    url: '/business/contacts'
  },
  {
    label: 'Agreements',
    type: 'button',
    icon: 'signature',
    url: '/business/agreements'
  },
  {
    label: 'Orders',
    type: 'button',
    icon: 'shopping-cart',
    url: '/business/orders'
  },
  {
    label: 'Invoices',
    type: 'button',
    icon: 'file-invoice-dollar',
    url: '/business/invoices'
  },
  {
    label: 'Transactions',
    type: 'button',
    icon: 'exchange-alt',
    url: '/business/transactions'
  },
  {
    label: 'Accounts',
    type: 'button',
    icon: 'piggy-bank',
    url: '/business/accounts'
  },
  {
    label: 'Storage',
    type: 'button',
    icon: 'warehouse',
    url: '/business/storage'
  },
  {
    label: 'Test',
    type: 'button',
    icon: 'cube',
    expanded: true,
    items: [
      {
        label: 'Test',
        type: 'button',
        icon: 'cube'
      },
      {
        label: 'Test',
        type: 'button',
        icon: 'cube',
        expanded: true,
        items: [
          {
            label: 'Test',
            type: 'button',
            icon: 'cube',
            expanded: true,
            items: [
              {
                label: 'Test',
                type: 'button',
                icon: 'cube'
              },
              {
                label: 'Test',
                type: 'button',
                icon: 'cube'
              }
            ]
          },
          {
            label: 'Test',
            type: 'button',
            icon: 'cube'
          }
        ]
      }
    ]
  },
  {
    type: 'divider'
  },
  {
    label: 'Settings',
    type: 'button',
    icon: 'cog',
    url: '/business/settings'
  }
]
