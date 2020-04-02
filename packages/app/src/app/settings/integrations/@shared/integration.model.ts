export interface Integration {
  key: string
  title: string
  description?: string
  icon?: string[] | string
  color?: string
  config?: any
  disabled?: boolean
}

export const INTEGRATIONS: Integration[] = [{
  key: 'stripe',
  title: 'Stripe',
  icon: ['fab', 'stripe-s'],
  color: '#5433FF',
  description: 'Stripe allows you to make and receive payments over the Internet',
  disabled: true,
  config: {
    key: {
      label: 'Private Key'
    }
  }
}, {
  key: 'mailgun',
  title: 'Mailgun',
  icon: ['fas', 'at'],
  color: '#bb1419',
  description: 'Transactional Email APIs that enable you to send, receive, and track emails',
  disabled: true,
  config: {
    key: {
      label: 'Private Key'
    }
  }
}, {
  key: 'mailerlite',
  title: 'MailerLite',
  icon: ['fas', 'comment-alt'],
  color: '#00a154',
  description: 'Create advanced email marketing campaigns with features like automation, landing pages and surveys',
  disabled: true,
  config: {
    key: {
      label: 'Private Key'
    }
  }
}]
