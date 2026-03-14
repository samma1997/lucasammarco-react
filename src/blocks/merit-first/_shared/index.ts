// MeritFirst Design Tokens & Shared Constants

export const IMG = '/blocks/merit-first'

// Color system (dark theme)
export const MF_COLORS = {
  base: '#0a0a0a',
  surface: '#171717',
  white: '#ffffff',
  textForeground: 'rgba(255,255,255,0.95)',
  textMuted: 'rgba(255,255,255,0.6)',
  textDim: 'rgba(255,255,255,0.4)',
  border: 'rgba(255,255,255,0.1)',
  borderSubtle: 'rgba(255,255,255,0.06)',
  brandBlue: '#3b82f6',
  brandRed: '#ef4444',
  surfaceHover: 'rgba(255,255,255,0.06)',
} as const

// Fluid typography using clamp()
export const MF_TYPO = {
  hero: 'clamp(24px, 8vw, 112px)',
  sectionHeading: 'clamp(28px, 5vw, 56px)',
  subheading: 'clamp(20px, 3vw, 24px)',
  body: '1rem',
  bodySmall: '0.875rem',
  label: '0.875rem',
} as const

export const MF_TRACKING = {
  hero: '-0.04em',
  sectionHeading: '-0.03em',
  subheading: '-0.02em',
  tight: '-0.015em',
} as const

export const MF_LEADING = {
  hero: '0.9',
  heading: '0.95',
  body: '1.6',
} as const

// Content width
export const MF_CONTENT_WIDTH = '1200px'

// Company logos for carousel
export const MF_COMPANIES = [
  'avila', 'bronco', 'fieldguide', 'candid', 'hellopatient', 'ramp',
  'patlytics', 'standardmetrics', 'fitlabs', 'clay', 'loop', 'promise',
  'julius', 'opto', 'vals', 'edia', 'numeric', 'lightlabs',
] as const

// Nav items
export const MF_NAV = [
  { label: 'For Companies', href: '#companies' },
  { label: 'For Candidates', href: '#candidates' },
  { label: 'Manifesto', href: '#manifesto' },
] as const

// Footer structure
export const MF_FOOTER = {
  platform: [
    { label: 'For Companies', href: '#' },
    { label: 'For Candidates', href: '#' },
  ],
  company: [
    { label: 'Manifesto', href: '#' },
    { label: 'Newsroom', href: '#' },
    { label: "We're Hiring!", href: '#' },
  ],
  legal: [
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
  social: [
    { label: 'LinkedIn', href: '#' },
    { label: 'X', href: '#' },
  ],
} as const

// Capabilities data
export const MF_CAPABILITIES = [
  {
    title: 'AI Test Creation',
    description: 'Generate role-specific assessments in seconds. Our AI analyzes job requirements and creates comprehensive skill evaluations.',
    image: `${IMG}/capabilities/capabilities_ai-test-creation.png`,
  },
  {
    title: 'Evaluation Integrity',
    description: 'Advanced proctoring and fraud detection ensures every assessment result is authentic and trustworthy.',
    image: `${IMG}/capabilities/capabilities_evaluation-integrity.png`,
  },
  {
    title: 'ATS Integration',
    description: 'Seamlessly connects with your existing applicant tracking system. No workflow disruption, instant results.',
    image: `${IMG}/capabilities/capabilities_ats-integration.png`,
  },
  {
    title: 'Candidate Experience',
    description: 'Beautiful, intuitive assessment interface that candidates actually enjoy. Higher completion rates, better data.',
    image: `${IMG}/capabilities/capabilities_candidate-experience.png`,
  },
] as const
