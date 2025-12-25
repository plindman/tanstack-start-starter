import type { FooterConfig } from '../types/footer'

export const defaultFooterData: FooterConfig = {
  // Minimal private app defaults
  copyright: '© {year} {appName}. All rights reserved.',
  sections: [
    {
      title: 'Product',
      items: [
        { label: 'About', to: '/about' }, // App About
      ],
    },
  ],

  // ========================================================================
  // EXAMPLES (Copy to src/config/footer.local.ts to override)
  // ========================================================================

  // 1. COMPANY LINKS (If you have a separate company site)
  // sections: [
  //   {
  //     title: 'Product',
  //     items: [
  //       { label: 'About', to: '/about' },
  //     ],
  //   },
  //   {
  //     title: 'Company',
  //     items: [
  //       { label: 'About Us', href: 'https://company.com' },
  //       { label: 'Careers', href: 'https://company.com/careers' },
  //     ],
  //   }
  // ],

  // 1. BRANDING
  // brand: {
  //   name: 'My Cool App',
  //   description: 'The best app for doing the thing.',
  // },

  // 2. SOCIAL LINKS
  // socialLinks: [
  //   { platform: 'github', href: 'https://github.com/tanstack/router' },
  //   { platform: 'twitter', href: 'https://twitter.com/tanstack' },
  // ],

  // 3. COMPLEX SECTIONS (e.g. for marketing pages)
  // sections: [
  //   {
  //     title: 'Product',
  //     items: [
  //       { label: 'Features', to: '/features' },
  //       { label: 'Pricing', to: '/pricing' },
  //       { label: 'Changelog', href: 'https://github.com/my-org/my-repo/releases' },
  //     ],
  //   },
  //   {
  //     title: 'Company',
  //     items: [
  //       { label: 'About', to: '/about' },
  //       { label: 'Careers', to: '/careers' },
  //       { label: 'Contact', to: '/contact' },
  //     ],
  //   },
  //   {
  //     title: 'Legal',
  //     items: [
  //       { label: 'Privacy', to: '/legal/privacy' },
  //       { label: 'Terms', to: '/legal/terms' },
  //     ],
  //   }
  // ],
}
