import { defaultFooterData } from '../config/footer.default'
import type { FooterConfig } from '../types/footer'

// Helper to deep merge objects (simplified for our config needs)
// If complexity grows, consider using defu or lodash.merge
function mergeConfig<T>(defaults: T, overrides?: Partial<T>): T {
  if (!overrides) return defaults
  // Shallow merge is likely sufficient for top-level keys, but let's do a spread.
  // Note: Arrays are usually replaced, not merged, in simple configs, 
  // which is typically what we want for "sections" or "socialLinks".
  return { ...defaults, ...overrides }
}

// ------------------------------------------------------------------
// FOOTER CONFIG LOADER
// ------------------------------------------------------------------

// We use import.meta.glob to be able to detect if the file exists without crashing at runtime
// This returns a map of { 'path': () => import('path') }
const footerOverridesGlob = import.meta.glob('../config/footer.local.ts', { eager: true })

// Extract the module if it exists
const footerOverrideModule = Object.values(footerOverridesGlob)[0] as { footerConfig?: Partial<FooterConfig> } | undefined

// Merge default with override
export const footerConfig: FooterConfig = mergeConfig(
  defaultFooterData,
  footerOverrideModule?.footerConfig
)

// ------------------------------------------------------------------
// APP CONFIG LOADER
// ------------------------------------------------------------------
import { defaultAppData } from '../config/app.default'
import type { AppConfig } from '../types/app'

const appOverridesGlob = import.meta.glob('../config/app.local.ts', { eager: true })
const appOverrideModule = Object.values(appOverridesGlob)[0] as { appConfig?: Partial<AppConfig> } | undefined

export const appConfig: AppConfig = mergeConfig(
  defaultAppData,
  appOverrideModule?.appConfig
)
