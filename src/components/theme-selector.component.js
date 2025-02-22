import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { some } from 'lodash-es';
import { useState } from 'react';
import styled from 'styled-components';

import { MODE, THEME_OPTIONS, THEME_OPTIONS_HASH } from 'utilities/constant';

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

export const ThemeSelector = () => {
  const { DARK, LIGHT } = MODE;

  const [currentTheme, setCurrentTheme] = useState(() => {
    const currentMode = window.localStorage.getItem('theme');

    const response = some(THEME_OPTIONS, data => data.mode === currentMode) ? currentMode : LIGHT;
    document.documentElement.setAttribute('data-theme', response);

    return response;
  });

  const handleToggleTheme = () => {
    const newTheme = currentTheme === DARK ? LIGHT : DARK;

    document.documentElement.setAttribute('data-theme', newTheme);
    window.localStorage.setItem('theme', newTheme);

    setCurrentTheme(newTheme);
  };

  return <ThemeButton key={currentTheme} icon={THEME_OPTIONS_HASH[currentTheme].icon} onClick={handleToggleTheme} />;
};
