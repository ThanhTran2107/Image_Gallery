import { faEarth } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { map } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Dropdown } from 'components/dropdown.component';
import { Space } from 'components/space.component';

import { LANGUAGE_OPTIONS, LANGUAGE_OPTIONS_HASH } from 'utilities/constant';

const LanguageButton = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 0.5rem;

  @media only screen and (min-width: 768px) {
    font-size: 1rem;
  }
  @media only screen and (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const Language = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
`;

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const { language, changeLanguage } = i18n;

  return (
    <Space size="small">
      <Language key={language}>{LANGUAGE_OPTIONS_HASH[language].label}</Language>

      <Dropdown
        menu={{
          items: map(LANGUAGE_OPTIONS, ({ locale, label }) => ({
            label,
            key: locale,
            onClick: () => changeLanguage(locale),
          })),
        }}
      >
        <LanguageButton icon={faEarth} />
      </Dropdown>
    </Space>
  );
};
