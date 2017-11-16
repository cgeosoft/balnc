export const MODS: any = [
  {
    icon: "fa fa-dashboard",
    label: "Index",
    root: "index"
  },
  {
    icon: "fa fa-building",
    label: "Data",
    root: "data"
  },
  {
    icon: "fa fa-files",
    label: "Invoices",
    root: "invoices",
    mod: "../../business/invoices/invoices.module#InvoicesModule"
  },
  {
    icon: "fa fa-comments",
    label: "Chat",
    root: "chat",
    mod: "../../main/chat/chat.module#InvoicesModule"
  },
  {
    icon: "fa fa-user",
    label: "Profile",
    root: "profile",
    type: "secondary"
  },
  {
    icon: "fa fa-cogs",
    label: "Settings",
    root: "settings",
    type: "secondary"
  },
]
