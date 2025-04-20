import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { QueryClient } from '@tanstack/react-query';
import { keyBy } from 'lodash-es';

export const IMG_BB_KEY = '868291d780259aa681c8063a2c09121c';
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
  GRAY_55: '#7f7f7f55',
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

export const queryClient = new QueryClient();

export const QUERY_KEYS = Object.freeze({
  ALBUMS: 'albums',
  IMAGES: 'images',
  IMAGES_SIZE: 'images-size',
});
