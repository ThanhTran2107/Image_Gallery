import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export const IMG_BB_KEY = 'c78e725ddd5bd8476285b43c99297428';
export const UPLOAD_IMAGE_END_POINT = `https://api.imgbb.com/1/upload?key=${IMG_BB_KEY}`;
export const HTTP_POST = 'POST';
export const FIRE_BASE_IMAGE_TABLE = 'FIRE_BASE_IMAGE_TABLE';
export const FIRE_BASE_IMAGE_FIELD_ID = 'FIRE_BASE_IMAGE_FIELD_ID';

export const COLORS = Object.freeze({
  darkBackground: 'black',
  lightPrimaryText: 'black',
  lightBackground: 'white',
  darkPrimaryText: 'white',
});

export const MODE = Object.freeze({
  dark: 'dark',
  light: 'light',
});

export const THEME_OPTIONS = [
  { icon: faSun, mode: 'light' },
  { icon: faMoon, mode: 'dark' },
];
