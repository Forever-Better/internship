import { Icon24SunOutline, Icon24Moon } from '@vkontakte/icons';
import { IconButton } from '@vkontakte/vkui';
import { useTheme } from 'next-themes';
import { useCallback } from 'react';

import { ThemeMode } from '@/types/enums';

const ThemeButton: React.FC = () => {
  const { setTheme, systemTheme, theme } = useTheme();

  const getTheme = useCallback(() => {
    if (theme === ThemeMode.LIGHT) return ThemeMode.DARK;
    if (theme === ThemeMode.DARK) return ThemeMode.LIGHT;
    if (theme === ThemeMode.SYSTEM) {
      if (systemTheme === ThemeMode.LIGHT) return ThemeMode.DARK;
      if (systemTheme === ThemeMode.DARK) return ThemeMode.LIGHT;
    }
    return null;
  }, [theme, systemTheme]);

  const getIcon = useCallback(() => {
    if (theme === ThemeMode.LIGHT) return <Icon24Moon />;
    if (theme === ThemeMode.DARK) return <Icon24SunOutline />;
    if (theme === ThemeMode.SYSTEM) {
      if (systemTheme === ThemeMode.LIGHT) return <Icon24Moon />;
      if (systemTheme === ThemeMode.DARK) return <Icon24SunOutline />;
    }
    return null;
  }, [theme, systemTheme]);

  return (
    <IconButton
      onClick={() => {
        setTheme(getTheme() ?? '');
      }}
    >
      {getIcon()}
    </IconButton>
  );
};

export default ThemeButton;
