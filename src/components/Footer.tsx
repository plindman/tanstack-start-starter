import { Link } from '@tanstack/react-router'
import { footerConfig, appConfig } from '../lib/config'

export function Footer() {
  const { copyright, sections, brand, socialLinks } = footerConfig
  const year = new Date().getFullYear().toString()
  const copyrightText = copyright
    .replace('{year}', year)
    .replace('{appName}', appConfig.name)

  const isSimple = sections.length === 1

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto p-8">
        {isSimple ? (
          // SIMPLE LAYOUT (Single Category -> Flat)
          <div className="flex flex-col md:flex-row justify-between gap-8">
             {/* Brand Column */}
             <div className="space-y-4">
                <div className="flex items-center gap-2 font-bold text-xl">
                   {brand?.logo ? (
                       <img src={brand.logo} alt={brand.name} className="w-8 h-8 object-contain" />
                   ) : (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">
                        TS
                      </div>
                   )}
                  {brand?.name || appConfig.name}
                </div>
                {brand?.description && (
                   <p className="text-sm text-muted-foreground max-w-xs block">
                     {brand.description}
                   </p>
                )}
                 {socialLinks && socialLinks.length > 0 && (
                  <div className="flex gap-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.platform + link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                        aria-label={link.label || link.platform}
                      >
                         <span className="capitalize text-xs">{link.platform}</span>
                      </a>
                    ))}
                  </div>
                )}
             </div>

             {/* Links (Flat List) */}
             <div className="flex flex-col md:flex-row gap-6 md:items-center">
                {sections[0].items.map((item) => (
                  <div key={item.label}>
                    {item.to ? (
                      <Link to={item.to} className="text-sm text-muted-foreground hover:text-foreground">
                        {item.label}
                      </Link>
                    ) : item.href ? (
                      <a
                        href={item.href}
                        target={item.target || '_blank'}
                        rel={item.rel || 'noreferrer'}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground/50 cursor-not-allowed">
                        {item.label}
                      </span>
                    )}
                  </div>
                ))}
             </div>
          </div>
        ) : (
          // MULTI-COLUMN LAYOUT (Marketing style)
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl">
                 {brand?.logo ? (
                     <img src={brand.logo} alt={brand.name} className="w-8 h-8 object-contain" />
                 ) : (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">
                      TS
                    </div>
                 )}
                {brand?.name || appConfig.name}
              </div>
              {brand?.description && (
                 <p className="text-sm text-muted-foreground">
                   {brand.description}
                 </p>
              )}

               {socialLinks && socialLinks.length > 0 && (
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.platform + link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                      aria-label={link.label || link.platform}
                    >
                       <span className="capitalize text-xs">{link.platform}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
            
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      {item.to ? (
                        <Link to={item.to} className="hover:text-foreground">
                          {item.label}
                        </Link>
                      ) : item.href ? (
                        <a
                          href={item.href}
                          target={item.target || '_blank'}
                          rel={item.rel || 'noreferrer'}
                          className="hover:text-foreground"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <span className="text-muted-foreground/50 cursor-not-allowed">
                          {item.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="border-t py-6 text-center text-sm text-muted-foreground">
        {copyrightText}
      </div>
    </footer>
  )
}
