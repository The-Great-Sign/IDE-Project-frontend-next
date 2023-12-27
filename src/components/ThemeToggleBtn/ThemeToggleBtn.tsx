import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';
import useThemeStore from '@/store/useThemeStore';
import { IconContext } from 'react-icons';
import { ThemeBtn } from './ThemeToggleBtn.style';

const ThemeToggleBtn = () => {
  const { toggleTheme, isDarkMode } = useThemeStore();
  const iconColor = isDarkMode ? 'yellow' : 'black';

  return (
    <ThemeBtn onClick={toggleTheme}>
      <IconContext.Provider value={{ color: iconColor, size: '25px' }}>
        {isDarkMode ? <RiSunFill /> : <RiMoonClearFill />}
      </IconContext.Provider>
    </ThemeBtn>
  );
};
export default ThemeToggleBtn;
