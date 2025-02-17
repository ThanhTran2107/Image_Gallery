import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export const IMG_BB_KEY = 'c78e725ddd5bd8476285b43c99297428';
export const UPLOAD_IMAGE_END_POINT = `https://api.imgbb.com/1/upload?key=${IMG_BB_KEY}`;
export const HTTP_POST = 'POST';
export const FIRE_BASE_IMAGE_TABLE = 'FIRE_BASE_IMAGE_TABLE';
export const FIRE_BASE_IMAGE_FIELD_ID = 'FIRE_BASE_IMAGE_FIELD_ID';

export const COLORS = Object.freeze({
  //NEUTRAL COLORS
  BLACK: '#000000',
  WHITE: '#FFFFFF',

  //BLUE COLORS
  BRIGHT_BLUE: 'rgb(0 123 255)',
  BLUE: 'blue',

  //GRAY COLORS
  FOG_GRAY: '#726f6f75',
  DARK_GRAY: '#3b3b3b',

  //PINK COLORS
  DARK_PINK: '#70114b',
  DEEP_PINK: '#ca077e',

  //SHADE COLOR
  BLACK_55: 'rgb(0 0 0 / 55%)',
});

export const MODE = Object.freeze({
  DARK: 'dark',
  LIGHT: 'light',
});

export const THEME_OPTIONS = [
  { icon: faSun, mode: 'light' },
  { icon: faMoon, mode: 'dark' },
];
