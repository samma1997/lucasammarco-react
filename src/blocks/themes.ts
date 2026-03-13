import type { BrandTheme } from './types'

/**
 * TEMI PRONTI ALL'USO
 *
 * Per cambiare branding a un sito assemblato:
 * 1. Scegli un tema da qui OPPURE creane uno nuovo
 * 2. Passalo al ThemeProvider nel layout del sito
 * 3. Tutti i blocchi si adattano automaticamente
 *
 * I blocchi usano queste CSS custom properties:
 *   --theme-bg, --theme-text, --theme-accent,
 *   --theme-surface, --theme-border,
 *   --theme-button-bg, --theme-button-text
 */

export const themes: Record<string, BrandTheme> = {
  // Tema originale Museum of Money
  'momoney-green': {
    name: 'MoMoney Green',
    bg: '#00592b',
    text: '#1ce585',
    accent: '#f580db',
    surface: '#004d25',
    border: 'rgba(28, 229, 133, 0.2)',
    buttonBg: '#f1f0ec',
    buttonText: '#190f0a',
  },

  // Dark elegante
  'dark-minimal': {
    name: 'Dark Minimal',
    bg: '#0a0a0a',
    text: '#f5f5f5',
    accent: '#6366f1',
    surface: '#161616',
    border: 'rgba(255, 255, 255, 0.08)',
    buttonBg: '#f5f5f5',
    buttonText: '#0a0a0a',
  },

  // Luxury gold
  'luxury-gold': {
    name: 'Luxury Gold',
    bg: '#1a1410',
    text: '#e8d5b5',
    accent: '#c9a96e',
    surface: '#231c14',
    border: 'rgba(201, 169, 110, 0.2)',
    buttonBg: '#c9a96e',
    buttonText: '#1a1410',
  },

  // Tech blue
  'tech-blue': {
    name: 'Tech Blue',
    bg: '#0f172a',
    text: '#e2e8f0',
    accent: '#38bdf8',
    surface: '#1e293b',
    border: 'rgba(56, 189, 248, 0.15)',
    buttonBg: '#38bdf8',
    buttonText: '#0f172a',
  },

  // Clean white
  'clean-white': {
    name: 'Clean White',
    bg: '#fafafa',
    text: '#18181b',
    accent: '#2563eb',
    surface: '#ffffff',
    border: 'rgba(0, 0, 0, 0.08)',
    buttonBg: '#18181b',
    buttonText: '#fafafa',
  },

  // Neon cyber
  'neon-cyber': {
    name: 'Neon Cyber',
    bg: '#0d0d0d',
    text: '#00ff88',
    accent: '#ff0080',
    surface: '#1a1a1a',
    border: 'rgba(0, 255, 136, 0.15)',
    buttonBg: '#00ff88',
    buttonText: '#0d0d0d',
  },

  // Warm terracotta
  'warm-terra': {
    name: 'Warm Terracotta',
    bg: '#1c1210',
    text: '#f0e6dc',
    accent: '#c4704b',
    surface: '#2a1c18',
    border: 'rgba(196, 112, 75, 0.2)',
    buttonBg: '#c4704b',
    buttonText: '#1c1210',
  },

  // Corporate navy
  'corporate-navy': {
    name: 'Corporate Navy',
    bg: '#0a1628',
    text: '#d1d5db',
    accent: '#3b82f6',
    surface: '#111d35',
    border: 'rgba(59, 130, 246, 0.15)',
    buttonBg: '#3b82f6',
    buttonText: '#ffffff',
  },
}

/**
 * Genera le CSS custom properties da un tema.
 * Usalo in uno style tag o come inline style su un wrapper.
 */
export function themeToCSS(theme: BrandTheme): string {
  return `
    --theme-bg: ${theme.bg};
    --theme-text: ${theme.text};
    --theme-accent: ${theme.accent};
    --theme-surface: ${theme.surface};
    --theme-border: ${theme.border};
    --theme-button-bg: ${theme.buttonBg};
    --theme-button-text: ${theme.buttonText};
    --theme-selection-bg: ${theme.accent};
    --theme-selection-text: ${theme.bg};
    --theme-sticker: ${theme.accent};
  `
}

/**
 * Stessa cosa ma come oggetto React per inline styles.
 */
export function themeToCSSVars(theme: BrandTheme): Record<string, string> {
  return {
    '--theme-bg': theme.bg,
    '--theme-text': theme.text,
    '--theme-accent': theme.accent,
    '--theme-surface': theme.surface,
    '--theme-border': theme.border,
    '--theme-button-bg': theme.buttonBg,
    '--theme-button-text': theme.buttonText,
    '--theme-selection-bg': theme.accent,
    '--theme-selection-text': theme.bg,
    '--theme-sticker': theme.accent,
  }
}
