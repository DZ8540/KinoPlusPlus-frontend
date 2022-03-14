export const FONT_WEIGHTS = ['regular', 'bold'] as const
export const FONT_SIZES = ['text', 'title'] as const
export const ICONS = [
  'lock', 'unlock', 'triangle', 
  'user', 'comments', 'bell', 
  'star', 'star--solid', 'clock',
  'heart', 'arrow', 'arrow__top', 
  'arrow__bottom', 'arrow__right',
  'search', 'logout', 'sun', 
  'moon', 'success', 'error',
  'plus', 'play', 'eye',
  'equals', 'clock--solid', 'heart--solid',
] as const

export const castFontClass = (val: string): string => `Font__${val}`
export const castIconClass = (val: string): string => `Icon__${val}`