import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { map, some } from 'lodash-es';
import { useState } from 'react';
import styled from 'styled-components';

import { MODE, THEME_OPTIONS } from 'utilities/constant';

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
  const [currentTheme, setCurrentTheme] = useState(() => {
    const currentMode = window.localStorage.getItem('theme');

    const response = some(THEME_OPTIONS, data => data.mode === currentMode) ? currentMode : MODE.LIGHT;
    document.documentElement.setAttribute('data-theme', response);

    return response;
  });

  const handleToggleTheme = () => {
    const newTheme = currentTheme === MODE.DARK ? MODE.LIGHT : MODE.DARK;

    document.documentElement.setAttribute('data-theme', newTheme);
    window.localStorage.setItem('theme', newTheme);

    setCurrentTheme(newTheme);
  };

  return (
    <>
      {map(
        THEME_OPTIONS,
        ({ icon, mode }) =>
          mode === (currentTheme === MODE.DARK ? MODE.LIGHT : MODE.DARK) && (
            <ThemeButton key={mode} icon={icon} onClick={handleToggleTheme} />
          ),
      )}
    </>
  );
};
