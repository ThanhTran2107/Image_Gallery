import React from 'react';
import { useContext } from 'react';
import { IntlProvider as IntlProviderWrapper } from 'react-intl';

import enMessages from 'lang/compiled/en.json';
import viMessages from 'lang/compiled/vi.json';

import { LocaleContext } from './locale.context';

const messages = {
  en: enMessages,
  vi: viMessages,
};

export const IntlProvider = ({ children }) => {
  const { locale } = useContext(LocaleContext);

  return (
    <IntlProviderWrapper locale={locale} messages={messages[locale]}>
      {children}
    </IntlProviderWrapper>
  );
};
