import { keyBy } from 'lodash-es';

const CACHED_ALBUMS = {};

export const CACHED_ALBUMS_HASH = keyBy(CACHED_ALBUMS, 'albumId');
