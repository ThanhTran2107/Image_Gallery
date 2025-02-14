import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export const IMG_BB_KEY = 'c78e725ddd5bd8476285b43c99297428';
export const UPLOAD_IMAGE_END_POINT = `https://api.imgbb.com/1/upload?key=${IMG_BB_KEY}`;
export const HTTP_POST = 'POST';
export const FIRE_BASE_IMAGE_TABLE = 'FIRE_BASE_IMAGE_TABLE';
export const FIRE_BASE_IMAGE_FIELD_ID = 'FIRE_BASE_IMAGE_FIELD_ID';

export const COLORS = Object.freeze({
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  BRIGHT_BLUE: 'rgb(0 123 255)',
  FOG_GRAY: '#726f6f75',
  DARK_GRAY: '#3b3b3b',
  DEEP_PINK: '#ca077e',
  BLUE: 'blue',
  BLACK_55: 'rgb(0 0 0 / 55%)',
});

export const MODE = Object.freeze({
  dark: 'dark',
  light: 'light',
});

export const THEME_OPTIONS = [
  { icon: faSun, mode: 'light' },
  { icon: faMoon, mode: 'dark' },
];
