export const BOARDS_SIDEBAR = {
  title: 'Boards',
  search: null,
  marked: null,
  menu: [
    {
      label: 'Boards',
      type: 'PAGE',
      icon: 'border-all',
      url: '/boards/manage'
    },
    {
      type: 'DIVIDER'
    },
    {
      label: 'Settings',
      type: 'PAGE',
      icon: 'cog',
      url: '/boards/settings'
    }
  ]
}
