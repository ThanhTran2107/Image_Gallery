import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { keyBy } from 'lodash-es';

export const IMG_BB_KEY = 'c78e725ddd5bd8476285b43c99297428';
export const UPLOAD_IMAGE_END_POINT = `https://api.imgbb.com/1/upload?key=${IMG_BB_KEY}`;
export const HTTP_POST = 'POST';
export const FIRE_BASE_IMAGE_TABLE = 'FIRE_BASE_IMAGE_TABLE';
export const FIRE_BASE_IMAGE_FIELD_ID = 'FIRE_BASE_IMAGE_FIELD_ID';

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_LENGTH = 200;

export const LOCALSTORAGE_KEY = Object.freeze({
  LOCALE: 'locale',
  THEME: 'theme',
  CURRENT_ALBUM_ID: 'currentAlbumId',
});

export const ATTRIBUTE_DATA = Object.freeze({
  DATA_THEME: 'data-theme',
});

export const COLORS = Object.freeze({
  //NEUTRAL COLORS
  BLACK: '#000000',
  WHITE: '#FFFFFF',

  //BLUE COLORS
  BRIGHT_BLUE: '#1677ff',
  BLUE: '#4096ff',

  //GRAY COLORS
  FOG_GRAY: '#726f6f75',
  DARK_GRAY: '#3b3b3b',

  //PINK COLORS
  DARK_PINK: '#70114b',
  DEEP_PINK: '#ca077e',

  //YELLOW COLORS
  CYBER_YELLOW: '#ffd809',

  //SHADE COLOR
  BLACK_55: 'rgb(0 0 0 / 55%)',
});

export const MODE = Object.freeze({
  DARK: 'dark',
  LIGHT: 'light',
});

export const LOCALE = Object.freeze({
  EN: 'en',
  VI: 'vi',
});

export const THEME_OPTIONS = [
  { mode: MODE.LIGHT, icon: faSun },
  { mode: MODE.DARK, icon: faMoon },
];

export const LANGUAGE_OPTIONS = [
  {
    locale: LOCALE.EN,
    label: 'English',
  },
  {
    locale: LOCALE.VI,
    label: 'Vietnamese',
  },
];

export const THEME_OPTIONS_HASH = keyBy(THEME_OPTIONS, 'mode');

export const LANGUAGE_OPTIONS_HASH = keyBy(LANGUAGE_OPTIONS, 'locale');
