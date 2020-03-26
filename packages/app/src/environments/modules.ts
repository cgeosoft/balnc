import { Module } from '@balnc/shared'

export const modules: Module[] = [{
  key: 'business',
  title: 'Business',
  type: 'CORE',
  description: 'Manage customers, orders, invoices and other daily tasks.',
  icon: 'fax',
  color: '#42A5F5'
}, {
  key: 'documents',
  title: 'Documents',
  type: 'CORE',
  description: 'Manage documents, notes and files.',
  icon: 'file',
  color: '#4DB6AC'
}, {
  key: 'projects',
  title: 'Projects',
  type: 'CORE',
  description: 'Manage projects and tasks. Use this with sync and collaborate with others. ',
  icon: 'project-diagram',
  color: '#9575CD'
}, {
  key: 'boards',
  title: 'Boards',
  type: 'CORE',
  description: 'An internal collaboration tool for communication and sharing files.',
  icon: 'comments',
  color: '#F06292'
}, {
  key: 'presentations',
  title: 'Presentations',
  type: 'CORE',
  description: 'Create presentations for clients. Use this with sync to have them in tablet and TV.',
  icon: 'desktop',
  color: '#FF8A65'
}, {
  key: 'analytics',
  title: 'Analytics',
  type: 'CORE',
  description: 'Dynamic analytics for any application.',
  icon: 'chart-pie',
  color: '#9ccc65',
  disabled: true
}, {
  key: 'stripe',
  title: 'Stripe',
  type: 'INTERGRATION',
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
  type: 'INTERGRATION',
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
  type: 'INTERGRATION',
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
