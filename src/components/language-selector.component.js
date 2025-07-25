import { faEarth } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { map } from 'lodash-es';
import { useContext } from 'react';
import styled from 'styled-components';

import { Dropdown } from 'components/dropdown.component';
import { Space } from 'components/space.component';

import { LANGUAGE_OPTIONS, LANGUAGE_OPTIONS_HASH } from 'utilities/constant';

import { LocaleContext } from 'contexts/locale.context';

const LanguageButton = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 1.1rem;

  @media only screen and (min-width: 768px) {
    font-size: 1.3rem;
  }
  @media only screen and (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const Language = styled.span`
  font-size: 1.1rem;
  font-weight: 500;

  @media only screen and (min-width: 768px) {
    font-size: 1.3rem;
  }

  @media only screen and (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

export const LanguageSelector = () => {
  const { locale, setLocale } = useContext(LocaleContext);

  return (
    <Space size="small">
      <Dropdown
        menu={{
          items: map(LANGUAGE_OPTIONS, ({ locale, label }) => ({
            label,
            key: locale,
            onClick: () => setLocale(locale),
          })),
        }}
      >
        <Space>
          <Language key={locale}>{LANGUAGE_OPTIONS_HASH[locale].label}</Language>
          <LanguageButton icon={faEarth} />
        </Space>
      </Dropdown>
    </Space>
  );
};
