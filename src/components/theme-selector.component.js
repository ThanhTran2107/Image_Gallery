import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { some } from 'lodash-es';
import { useState } from 'react';
import styled from 'styled-components';

import { MODE, THEME_OPTIONS, THEME_OPTIONS_HASH } from 'utilities/constant';
import { LOCALSTORAGE_KEY } from 'utilities/constant';
import { ATTRIBUTE_DATA } from 'utilities/constant';
import { getLocalStorage, setLocalStorage } from 'utilities/services/common';

const ThemeButton = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 0.5rem;

  @media only screen and (min-width: 768px) {
    font-size: 1rem;
  }
  @media only screen and (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const { THEME: THEME_KEY } = LOCALSTORAGE_KEY;
const { DATA_THEME } = ATTRIBUTE_DATA;

export const ThemeSelector = () => {
  const { DARK, LIGHT } = MODE;

  const [currentTheme, setCurrentTheme] = useState(() => {
    const currentMode = getLocalStorage(THEME_KEY);

    const response = some(THEME_OPTIONS, data => data.mode === currentMode) ? currentMode : LIGHT;
    document.documentElement.setAttribute(DATA_THEME, response);

    return response;
  });

  const handleToggleTheme = () => {
    const newTheme = currentTheme === DARK ? LIGHT : DARK;

    document.documentElement.setAttribute(DATA_THEME, newTheme);
    setLocalStorage(THEME_KEY, newTheme);

    setCurrentTheme(newTheme);
  };

  return <ThemeButton key={currentTheme} icon={THEME_OPTIONS_HASH[currentTheme].icon} onClick={handleToggleTheme} />;
};
