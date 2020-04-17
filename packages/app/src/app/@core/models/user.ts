export interface User {
  username: string
  email?: string
  avatar?: string
  owner?: boolean
  config?: {
    theme: 'light' | 'dark';
    layout?: 'box' | 'fluid';
    menu?: {
      size?: 'normal' | 'compact';
      items?: string[];
    };
  }
}

export const DEFAULT_USER: User = {
  username: 'john',
  owner: false,
  config: {
    theme: 'light',
    layout: 'box',
    menu: {
      size: 'compact',
      items: null
    }
  }
}
