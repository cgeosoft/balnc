export const PROJECTS_SIDEBAR = {
  title: 'Projects',
  search: null,
  marked: null,
  menu: [
    {
      label: 'Overview',
      type: 'PAGE',
      icon: 'border-all',
      url: '/projects/overview'
    },
    {
      label: 'Projects',
      type: 'PAGE',
      icon: 'tasks',
      url: '/projects/projects'
    },
    {
      type: 'DIVIDER'
    },
    {
      label: 'Latest Issues',
      type: 'PAGE',
      icon: 'ticket-alt'
    },
    {
      type: 'DIVIDER'
    },
    {
      label: 'Settings',
      type: 'PAGE',
      icon: 'cog',
      url: '/projects/settings'
    }
  ]
}
