import { BPlugin } from '@balnc/shared'

export const plugins: BPlugin[] = [{
  key: 'business',
  title: 'Business',
  description: 'Manage customers, orders, invoices and other daily task for small business and freelancers.',
  icon: 'fax',
  color: '#42A5F5'
}, {
  key: 'documents',
  title: 'Documents',
  icon: 'file',
  color: '#4DB6AC'
}, {
  key: 'projects',
  title: 'Projects',
  description: 'Manage projects and tasks. Use this with sync and collaborate with others. ',
  icon: 'project-diagram',
  color: '#9575CD'
}, {
  key: 'boards',
  title: 'Boards',
  description: 'An internal collaboration tool for communication and sharing files.',
  icon: 'comments',
  color: '#F06292'
}, {
  key: 'presentations',
  title: 'Presentations',
  description: 'Create presentations for clients. Use this with sync to have them in tablet and TV.',
  icon: 'desktop',
  color: '#FF8A65'
}, {
  key: 'analytics',
  title: 'Analytics',
  icon: 'chart-pie',
  color: '#9ccc65',
  disabled: true
}, {
  key: 'reports',
  title: 'Reports',
  description: 'A simple but full-feature team chat with customizable rooms',
  icon: 'file-alt',
  color: '#ffa726',
  disabled: true,
  config: {
    server: {
      requireUser: {
        type: 'boolean'
      },
      host: {
        type: 'string'
      }
    }
  }
}]
