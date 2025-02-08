import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MODE, THEME_OPTIONS } from 'constant';
import { map, some } from 'lodash-es';
import { useState } from 'react';

export const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const currentMode = window.localStorage.getItem('theme');

    const response = some(THEME_OPTIONS, data => data.mode === currentMode) ? currentMode : MODE.light;
    document.documentElement.setAttribute('data-theme', response);

    return response;
  });

  const handleToggleTheme = () => {
    const newTheme = currentTheme === MODE.dark ? MODE.light : MODE.dark;

    document.documentElement.setAttribute('data-theme', newTheme);
    window.localStorage.setItem('theme', newTheme);

    setCurrentTheme(newTheme);
  };

  return (
    <>
      {map(
        THEME_OPTIONS,
        ({ icon, mode }) =>
          mode === (currentTheme === MODE.dark ? MODE.light : MODE.dark) && (
            <FontAwesomeIcon key={mode} icon={icon} onClick={handleToggleTheme} />
          ),
      )}
    </>
  );
};
