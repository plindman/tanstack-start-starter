// ------------------------------------------------------------------
// CONTENT LOADER
// ------------------------------------------------------------------

import { AboutContent as DefaultAbout } from '../config/content/about.default'

// We use import.meta.glob to safely check for the optional override file
const aboutContentGlob = import.meta.glob('../config/content/about.local.tsx', { eager: true })

// Extract the module if it exists
const aboutOverrideModule = Object.values(aboutContentGlob)[0] as { AboutContent?: React.ComponentType } | undefined

export const AboutContent = aboutOverrideModule?.AboutContent || DefaultAbout
