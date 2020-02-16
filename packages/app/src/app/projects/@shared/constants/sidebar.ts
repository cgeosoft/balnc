export const PROJECTS_SIDEBAR = {
  title: 'Projects',
  search: null,
  marked: null,
  menu: [
    {
      label: 'Overview',
      type: 'button',
      icon: 'border-all',
      url: '/projects/overview'
    },
    {
      label: 'Projects',
      type: 'button',
      icon: 'tasks',
      url: '/projects/projects'
    },
    {
      type: 'divider'
    },
    {
      label: 'Latest Issues',
      type: 'button',
      icon: 'ticket-alt'
    },
    {
      type: 'divider'
    },
    {
      label: 'Settings',
      type: 'button',
      icon: 'cog',
      url: '/projects/settings'
    }
  ]
}
