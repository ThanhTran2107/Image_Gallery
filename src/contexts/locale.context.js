import { some } from 'lodash-es';
import React from 'react';
import { createContext } from 'react';
import { useEffect, useState } from 'react';

import { LOCALE } from 'utilities/constant';
import { LOCALSTORAGE_KEY } from 'utilities/constant';
import { parseLocalStorage } from 'utilities/services/common';

const { EN } = LOCALE;
const { LOCALE: LOCALE_KEY } = LOCALSTORAGE_KEY;

export const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    const result = parseLocalStorage(LOCALE_KEY, EN);

    return some(LOCALE, data => data === result) ? result : EN;
  });

  useEffect(() => {
    localStorage.setItem(LOCALE_KEY, JSON.stringify(locale));
  }, [locale]);

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
};
