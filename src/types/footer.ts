
export interface FooterItem {
  label: string
  to?: string // data-tanstack-router path
  href?: string // external link
  target?: string
  rel?: string
}

export interface FooterSection {
  title: string
  items: FooterItem[]
}

export interface SocialLink {
  platform: 'github' | 'twitter' | 'linkedin' | 'discord' | 'custom'
  href: string
  label?: string // aria-label
  icon?: string // icon name or svg content (simplified for now as string)
}

export interface FooterConfig {
  brand?: {
    name: string
    description?: string
    logo?: string
  }
  copyright: string // supports {year} replacement
  sections: FooterSection[]
  socialLinks?: SocialLink[]
}
